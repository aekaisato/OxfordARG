import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
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
import $ from "jquery";
import { navigatePuzzle } from "../../components/navigation/navigation";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class ScienceRoom extends React.Component {
  async checkCode() {
    while (true) {
      let iframeContents = $("#scienceRoom").contents().find(".keySolved");
      if (
        iframeContents.length > 0 &&
        iframeContents[iframeContents.length - 1].innerText.includes(
          "Periodic Table"
        )
      ) {
        console.log("do stuff here");
        navigatePuzzle("Puzzle7");
        $("#scienceRoom").contents().find(".keySolved").remove();
        return;
      } else {
        $("#scienceRoom").contents().find(".keySolved").remove();
        await wait(1000);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.checkCode()} />
        <iframe
          width="100%"
          height="100%"
          src="/static/360-rooms/science/index.html"
          id="scienceRoom"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    overflow: "hidden",
  },
});
