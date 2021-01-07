import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { AsyncStorage } from "react-native";
import { syncUserToCloud } from "../status_system/status_system";

export async function createAccount(email: string, password: string) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser?.sendEmailVerification();
    console.log("email sent");
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
      logoutUser();
      console.log("please verify email");
      return "Please verify your email before logging in.";
    }
  } catch (error) {
    alert(error.message);
    return "Error: " + error.message;
  }
}

export async function logoutUser() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      alert(error.message);
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
