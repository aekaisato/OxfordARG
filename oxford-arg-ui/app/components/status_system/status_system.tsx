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
import { navigatePuzzle } from "../navigation/navigation";

/*
const statusLibrary = [
  {
    type: "puzzle/360/video/communicator/phase/wait", // which type to determine what action to do, such as navigate
    value: "", // what to pass into the action, such as the screen name or video
    save: true/false // whether to upload the current location to firebase or not
  },
];
//*/

const statusLibrary = [
  {
    type: "puzzle",
    value: "StatusDebugPage",
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
  },
  {
    type: "puzzle",
    value: "Puzzle3",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle4",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle5",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle6",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle7",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle8",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle9",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle10",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle11",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle12",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle13",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle14",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle15",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle16",
    save: true,
  },
];

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function setStatus(statusNum: number) {
  console.log("attempting to set status to " + statusNum);
  await AsyncStorage.setItem("status", 0 + "");
  return statusLibrary[statusNum];
}

export async function getStatus() {
  console.log("attempting to get status");
  let temp = await AsyncStorage.getItem("status");
  console.log("status: " + temp);
  return temp;
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
}) {
  console.log("attempting goto");
  console.log(status);
  if (status.type == "puzzle") {
    navigatePuzzle(status.value);
  }
  // need stuff for videos and other stuff, too
  // also need access to both stack navigators in order to navigate between screens
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
            title="start"
            onPress={async () => await goto(await setStatus(1))}
          />
          <Button
            title="continue"
            onPress={async () =>
              goto(statusLibrary[Number.parseInt(await getStatus())])
            }
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
