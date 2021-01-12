import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useReducer } from "react";
import { AsyncStorage } from "react-native";
import { getStatus, setStatus } from "../status_system/status_system";

export async function createAccount(email: string, password: string) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser?.sendEmailVerification();
    console.log("email sent");
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
    .ref("/statuses/" + user.uid + "/status")
    .set({
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
        .ref("/statuses/" + user.uid + "/status")
        .once("value")
    ).val().status;
  } catch {
    cloudStatus = null;
  }

  let localStatus: any = await getStatus();
  console.log("cloud:");
  console.log(cloudStatus);
  console.log("local: " + localStatus);
  if (cloudStatus == null || cloudStatus == NaN) {
    cloudStatus = 1;
  } else {
    cloudStatus = Number.parseInt(cloudStatus);
  }
  if (localStatus == null || localStatus == NaN) {
    localStatus = 1;
  } else {
    localStatus = Number.parseInt(localStatus);
  }

  let higher;
  if (override == "local") {
    higher = localStatus;
  } else if (override == "cloud") {
    higher = cloudStatus;
  } else {
    higher = Math.max(cloudStatus, localStatus);
  }

  console.log("setting both to " + higher);
  await setStatus(higher);
  await setCloudStatus(higher);
}
