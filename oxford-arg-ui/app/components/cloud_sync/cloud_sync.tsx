import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useReducer } from "react";
import { AsyncStorage } from "react-native";
import { updateCompletionData } from "../../other/completion_screen";
import { updateLeaderboardData } from "../layout_components/progress_leaderboard/progress_leaderboard";
import { getStatus, setStatus } from "../status_system/status_system";

let statusData = {};

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function updateData() {
  if (firebase.apps.length === 0) {
    await wait(1000);
    updateData();
    return;
  }
  let databaseRef = firebase.database().ref("/statuses/");
  console.log("starting sync of data");
  statusData = (await databaseRef.once("value")).val();
  updateLeaderboardData(statusData);
  databaseRef.on("value", async (snapshot) => {
    statusData = snapshot.val();
    updateLeaderboardData(statusData);
    updateCompletionData(statusData);
  });
}

export function getStatuses() {
  return statusData;
}

updateData();

export async function createAccount(
  email: string,
  password: string,
  name: string,
  stuID?: string
) {
  if (!stuID) {
    stuID = "";
  }
  if (!name) {
    stuID = "";
  }
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser?.sendEmailVerification();
    console.log("email sent");
    let user = firebase.auth().currentUser;
    if (user == null) {
      console.warn("user null when trying to send to thingy");
      return;
    }
    let database = firebase
      .database()
      .ref("/users/" + user.uid)
      .update({
        name: name,
        stuID: stuID,
      });
    await logoutUser();
    return "Please check your email to verify your account.";
  } catch (error) {
    console.warn(error.message);
    return "Error: " + error.message;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (firebase.auth().currentUser?.emailVerified) {
      console.log("signed in");
      return "You are now signed in.";
    } else {
      await logoutUser();
      console.log("please verify email");
      return "Please verify your email before logging in.";
    }
  } catch (error) {
    console.warn(error.message);
    return "Error: " + error.message;
  }
}

export async function logoutUser() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.warn(error.message);
      return "Error: " + error.message;
    });
  return "Successfully signed out.";
}

export function isLoggedIn() {
  let user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}

export async function setCloudStatus(status: number) {
  let user = firebase.auth().currentUser;
  if (user == null) {
    return;
  }
  await firebase
    .database()
    .ref("/statuses/" + user.uid)
    .update({
      status: status,
    });
}

export async function syncUserToCloud(override?: string) {
  let user = firebase.auth().currentUser;
  console.log(user);
  if (user == null) {
    return;
  }
  console.log("now syncing");
  let cloudStatus;
  try {
    cloudStatus = await (
      await firebase
        .database()
        .ref("/statuses/" + user.uid)
        .once("value")
    ).val().status;
  } catch {
    cloudStatus = null;
  }

  let localStatus: any = await getStatus();
  console.log("cloud:");
  console.log(cloudStatus);
  console.log("local:");
  console.log(localStatus)
  if (cloudStatus == null || cloudStatus == NaN) {
    cloudStatus = 1;
  } else {
    cloudStatus = Number.parseInt(cloudStatus);
    if (isNaN(cloudStatus)) {
      console.log("setting cloud status to 1")
      cloudStatus = 1;
    }
  }
  if (localStatus == null || localStatus == NaN) {
    localStatus = 1;
  } else {
    localStatus = Number.parseInt(localStatus);
    console.log(localStatus)
    if (isNaN(localStatus)) {
      console.log("setting local status to 1")
      localStatus = 1;
    }
  }

  console.log(cloudStatus);
  console.log(localStatus);

  let higher;
  if (override == "local") {
    higher = localStatus;
  } else if (override == "cloud") {
    higher = cloudStatus;
  } else {
    higher = Math.max(cloudStatus, localStatus);
  }

  console.log(higher)

  console.log("setting both to " + higher);
  await setStatus(higher);
  await setCloudStatus(higher);
}

export async function setCompletion() {
  console.log("trying to set completion time");
  let time = new Date().toISOString();
  let user = firebase.auth().currentUser;
  if (user == null) {
    return;
  }
  console.log("setting to " + time);
  let statusObj = await (
    await firebase
      .database()
      .ref("/statuses/" + user.uid)
      .once("value")
  ).val();
  if (
    statusObj.completed == undefined ||
    statusObj.completed == null ||
    statusObj.completed == ""
  ) {
    await firebase
      .database()
      .ref("/statuses/" + user.uid)
      .update({
        completed: time,
      });
  } else {
    console.warn("user account already completed, not overwriting");
  }
}
