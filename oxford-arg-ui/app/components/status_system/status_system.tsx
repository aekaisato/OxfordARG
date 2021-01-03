import React from "react";
import {
  AsyncStorage,
  View,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
  navigatePhase,
  navigatePuzzle,
  toLiveFeed,
} from "../navigation/navigation";
import { setPage } from "../inventory/notebook";
import { setProgress } from "../layout_components/progress_bar/progress_bar";
import { enableMuralClues, enableNotebook } from "../inventory/inventory";
import { updatePagesCollected1 } from "../../layouts/phase1_layout/phase1_layout";
import { updatePagesCollected2 } from "../../layouts/phase2_layout/phase2_layout";
import { updatePagesCollected3 } from "../../layouts/phase3_layout/phase3_layout";
import {
  getMural1Unlocked,
  getMural2Unlocked,
  setUnlocked,
} from "../inventory/mural-clues";
import {
  queuePlayer,
  setTranscriptLine,
  setTranscriptStr,
} from "../video_player/video_player";
import { queueLiveFeed } from "../live_feed/live_feed";
import { triggerIPEffect } from "../../other/ip_popup";

/*
const statusLibrary = [
  {
    type: "puzzle/360/video/communicator/phase/wait", // which type to determine what action to do, such as navigate
    value: "", // what to pass into the action, such as the screen name or video
    save: true/false // whether to upload the current location to firebase or not
  },
];
//*/

console.warn("shift pages and flags to match their actual location");
const statusLibrary = [
  // shift pages and flags to match their actual location
  // add continue property to show when not to wait for next status
  {
    type: "puzzle",
    value: "StatusDebugPage",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene1",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene1Line1",
    save: false,
  },
  {
    type: "puzzle",
    value: "Puzzle1",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle2",
    save: true,
    mural: 1,
  },
  {
    type: "puzzle",
    value: "Puzzle3",
    save: true,
    mural: 2,
  },
  {
    type: "360",
    value: "EnglishRoom",
    save: true,
    page: 0,
  },
  {
    type: "360",
    value: "OfficeRoom",
    save: true,
    page: 1,
  },
  {
    type: "360",
    value: "MathRoom",
    save: true,
    page: 2,
  },
  /*
  {
    type: "puzzle",
    value: "Puzzle6",
    save: true,
  },
  //*/
  {
    type: "360",
    value: "ScienceRoom",
    save: true,
    page: 3,
  },
  {
    type: "wait",
    value: "2000",
    page: 4,
  },
  {
    type: "blackout",
    value: "blackout",
    save: true,
  },
  {
    type: "phase",
    value: "Phase2",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle8",
    save: true,
  },
  {
    type: "360",
    value: "LanguageRoom",
    save: true,
  },
  {
    type: "360",
    value: "HistoryRoom",
    save: true,
    page: 5,
  },
  {
    type: "360",
    value: "PERoom",
    save: true,
    page: 6,
  },
  {
    type: "puzzle",
    value: "Puzzle12",
    save: true,
    page: 7,
  },
  {
    type: "phase",
    value: "Phase3",
    save: true,
    page: 8,
  },
  {
    type: "puzzle",
    value: "Puzzle13",
    save: true,
  },
  {
    type: "360",
    value: "ChoirRoom",
    save: true,
  },
  /*
  {
    type: "puzzle",
    value: "Puzzle14",
    save: false,
  },
  //*/
  {
    type: "360",
    value: "PathwayRoom",
    save: true,
    page: 9,
  },
  {
    type: "puzzle",
    value: "Puzzle16",
    save: true,
    page: 10,
  },
];

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function setStatus(statusNum: number) {
  console.log("attempting to set status to " + statusNum);
  await AsyncStorage.setItem("status", statusNum + "");
  return statusLibrary[statusNum];
}

export async function getStatus() {
  console.log("attempting to get status");
  let temp = await AsyncStorage.getItem("status");
  console.log("status: " + temp);
  return temp;
}

export function getLibrary() {
  return statusLibrary;
}

export async function increment() {
  console.log("attempting to get status");
  let temp = await AsyncStorage.getItem("status");
  console.log("attempting to increment status from " + temp);
  if (status != undefined && status != null) {
    try {
      let finalNum = Number.parseInt(temp) + 1;
      await AsyncStorage.setItem("status", finalNum + "");
      let final = statusLibrary[finalNum];
      console.log("returning below log");
      console.log(final);
      return final;
    } catch (err) {
      console.warn(err);
    }
  } else {
    console.warn("status is undefined or null");
  }
  return { type: "error", value: "increment unsuccessful", save: false };
}

/*
(async function(){
  await wait(2000);
  await goto(await increment());
})();
//*/

export async function goto(status: {
  type: string;
  value: string;
  save: boolean;
  continue?: boolean;
}) {
  console.log("attempting goto");
  console.log(status);
  
  if (status.type == "puzzle" || status.type == "360") {
    navigatePuzzle(status.value);
  } else if (status.type == "phase") {
    navigatePhase(status.value);
    await goto(await increment());
  } else if (status.type == "livefeed") {
    let temp = false;
    if (status.continue != undefined) {
      if (status.continue == true) {
        temp = true;
      }
    }
    toLiveFeed();
    queueLiveFeed(status.value, temp);
  } else if (status.type == "communicator") {
    queuePlayer(status.value);
  } else if (status.type == "blackout") {
    navigatePhase("BlackoutTransition");
  } else if (status.type == "wait") {
    await wait(Number.parseInt(status.value));
    (async function () {
      await goto(await increment());
    })();
  }

  let statusVal = await getStatus();
  let library = getLibrary();
  if (statusVal == null) {
    return;
  }
  let percent = statusVal / library.length;
  setProgress(percent);

  if (!getMural1Unlocked()) {
    setUnlocked(1, await isUnlockedMural(1, statusVal));
  }
  if (!getMural2Unlocked()) {
    setUnlocked(2, await isUnlockedMural(2, statusVal));
  }

  for (let i = Number.parseInt(statusVal); i > 0; i--) {
    if (library[i].page != undefined) {
      if (library[i].page == 0) {
        enableNotebook();
        return;
      }
      setPage(library[i].page);
      updatePagesCollected1();
      updatePagesCollected2();
      updatePagesCollected3();
      if (i == Number.parseInt(statusVal)) {
        alert(
          "You found a notebook page! Check your inventory if you want to see it."
        );
      }
      return;
    }
  }

  if (status.continue != undefined && status.continue) {
    (async function () {
      await goto(await increment());
    })();
  }
}

export async function isUnlockedMural(num: number, status) {
  console.log(status);
  if (num != 1 && num != 2) {
    return false;
  }
  let library = statusLibrary;
  if (status == null) {
    return false;
  }
  for (let i = Number.parseInt(status); i > 0; i--) {
    if (library[i].mural != undefined) {
      if (num == 1 && library[i].mural == 1) {
        if (i == Number.parseInt(status)) {
          alert(
            "You found a mysterious clue! Check your inventory if you want to see it."
          );
        }
        return true;
      } else if (num == 2 && library[i].mural == 2) {
        if (i == Number.parseInt(status)) {
          alert(
            "You found a mysterious clue! Check your inventory if you want to see it."
          );
        }
        return true;
      }
    }
  }
  return false;
}

export async function initProgress() {
  // await AsyncStorage.setItem("status", "0");
  // await syncUserToCloud();
  let curr = await AsyncStorage.getItem("status");
  if (curr != null) {
    goto(statusLibrary[Number.parseInt(curr)]);
  } else {
    goto(statusLibrary[0]);
  }
}

export async function syncUserToCloud() {}

export async function fetchOthers() {}

async function createAccountTemp() {
  let email = prompt("email");
  let password = prompt("password");
  let studentid = prompt("student id");
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user: any) => {
      firebase
        .auth()
        .currentUser?.sendEmailVerification()
        .then(async function () {
          console.log("email sent");
          await AsyncStorage.setItem("studentId", studentid);
        })
        .catch(function (error) {
          alert(error.message);
        });
    })
    .catch((error: any) => {
      alert(error.message);
    });
}

async function checkForVerificationTemp() {
  while (true) {
    await wait(1000);
    let studentid = await AsyncStorage.getItem("studentId");
    if (firebase.auth().currentUser?.emailVerified) {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser?.uid)
        .set({
          studentId: studentid,
        });
      return;
    }
  }
}

checkForVerificationTemp();

async function loginTemp() {
  let email = prompt("email");
  let password = prompt("password");
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          if (firebase.auth().currentUser?.emailVerified) {
            console.log("signed in");
          } else {
            logoutTemp();
            alert("please verify your email");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch(function (error) {
      alert(error.message);
    });
}

async function logoutTemp() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      alert(error.message);
    });
}

async function getLoginInfoTemp() {
  console.log(firebase.auth().currentUser);
}

async function debugNavigatePuzzleTemp() {
  let temp = prompt("what puzzle to nav (e.g. Puzzle4Book)");
  navigatePuzzle(temp);
}

async function debugNavigatePhaseTemp() {
  let temp = prompt("what phase to nav (e.g. Phase3)");
  navigatePhase(temp);
}

async function debugCommunicatorTemp() {
  let temp = prompt("what video (e.g. Scene1Line1)");
  if (temp == null) {
    temp = "";
  }
  queuePlayer(temp);
}

async function debugTranscriptTemp1() {
  let temp = prompt("what to say");
  if (temp == null) {
    temp = "";
  }
  setTranscriptStr(temp);
}

async function debugTranscriptTemp2() {
  let temp = prompt("what line (e.g. Scene1Line1)");
  if (temp == null) {
    temp = "";
  }
  setTranscriptLine(temp);
}

async function debugLiveFeed() {
  let temp = prompt(
    "what video (e.g. Scene1) -- this will navigate to the next screen once the video is done"
  );
  if (temp == null) {
    temp = "";
  }
  toLiveFeed();
  queueLiveFeed(temp);
}

export class StatusDebugPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          source={require("../../../assets/dylan-temp.jpg")}
        >
          <Button
            title="set"
            onPress={() => setStatus(Number.parseInt(prompt("enter value")))}
          />
          <Button title="get" onPress={() => getStatus()} />
          <Button title="increment" onPress={() => increment()} />
          <Button title="sign up" onPress={() => createAccountTemp()} />
          <Button title="login" onPress={() => loginTemp()} />
          <Button title="logout" onPress={() => logoutTemp()} />
          <Button title="info" onPress={() => getLoginInfoTemp()} />
          <Button
            title="nav puzzle"
            onPress={() => debugNavigatePuzzleTemp()}
          />
          <Button title="nav phase" onPress={() => debugNavigatePhaseTemp()} />
          <Button title="test video" onPress={() => debugCommunicatorTemp()} />
          <Button title="test str" onPress={() => debugTranscriptTemp1()} />
          <Button title="test line" onPress={() => debugTranscriptTemp2()} />
          <Button title="test live feed" onPress={() => debugLiveFeed()} />
          <Button title="test ip trick" onPress={() => triggerIPEffect()} />
          <Button
            title="sound test"
            onPress={() => navigatePuzzle("SoundTest")}
          />
          <Button
            title="start"
            onPress={async () => await goto(await setStatus(1))}
          />
          <Button
            title="continue"
            onPress={async () => {
              console.warn(
                "don't forget to add the thing to switch phase on continue depending on status"
              );
              goto(statusLibrary[Number.parseInt(await getStatus())]);
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
});
