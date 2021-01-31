import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Button,
} from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  NavigationActions,
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
import { TextInput } from "react-native-gesture-handler";
import md5 from "crypto-js/md5";
import InnerHTML from "dangerously-set-html-content";
import { Asset } from "expo-asset";
import $ from "jquery";
import { goto, increment } from "../../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let disableCheckCode = false;

export class Puzzle10 extends React.Component {
  async checkCode() {
    while (true) {
      if (disableCheckCode) {
        disableCheckCode = true;
        return;
      }
      let iframeContents = $("#oregonTrail").contents();
      if (
        iframeContents.length > 0 &&
        iframeContents[0].body.innerHTML.indexOf("You Win!") >= 0
      ) {
        console.log("do stuff here");
        await wait(1000);
        await goto(await increment());
        return;
      } else {
        await wait(1000);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.checkCode()}
          onWillBlur={() => {
            disableCheckCode = true;
          }}
        />
        <iframe
          style={{ height: "100%", width: "100%" }}
          src="/static/oregon-trail-game-master/index.html" // https://stackoverflow.com/questions/16589306/get-data-from-iframe
          id="oregonTrail"
          frameBorder="0"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
});
