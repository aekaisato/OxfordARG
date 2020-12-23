import React from "react";
import { AsyncStorage, View, Button, StyleSheet } from "react-native";

/*
const statusLibrary = [
  {
    type: "puzzle/360/video/wait", // which type to determine what action to do, such as navigate
    value: "", // what to pass into the action, such as the screen name or video
    save: true/false // whether to upload the current location to firebase or not
  },
];
//*/

const statusLibrary = [
  {
    type: "puzzle",
    value: "Puzzle1",
    save: true
  },
  {
    type: "puzzle",
    value: "Puzzle2",
    save: true
  },
];

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function setStatus(statusNum: number) {
  console.log("attempting to set status to " + statusNum)
  return await AsyncStorage.setItem("status", 0 + "")
}

export async function getStatus() {
  console.log("attempting to get status")
  let temp = await AsyncStorage.getItem("status")
  console.log("status: " + temp)
  return temp;
}

export async function increment() {
  console.log("attempting to get status")
  let temp = await AsyncStorage.getItem("status");
  console.log("attempting to increment status from " + temp)
  if (status != undefined && status != null) {
    try {
      await AsyncStorage.setItem("status", (Number.parseInt(temp) + 1) + "")
      return true;
    } catch(err) {
      console.warn(err)
    }
  } else {
    console.warn("status is undefined or null")
  }
  return false;
}

// need goto and syncToCloud functions

export class StatusDebugPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="set" onPress={() => setStatus(Number.parseInt(prompt("enter value")))}/>
        <Button title="get" onPress={() => getStatus()}/>
        <Button title="increment" onPress={() => increment()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll"
  },
});
