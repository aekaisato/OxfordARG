import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  NavigationEvents,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { playSound } from "../components/sound_system/sound_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function performAnimation() {
  playSound("shutdown");
  await wait(6000);
  console.log("continue")
}

export class BlackoutTransition extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => performAnimation()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: deviceWidth,
    height: deviceHeight,
  },
});
   