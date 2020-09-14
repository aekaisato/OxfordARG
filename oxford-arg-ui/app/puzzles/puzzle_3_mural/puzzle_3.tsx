import React from "react";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
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

import Mural from "../../../assets/mural/rosaparks-mural-interactive.svg";

function checkForGreen() {
  //@ts-ignore
  let muralImage = $.find("#mural-image");
  if (
    muralImage[0].contentDocument == undefined ||
    muralImage[0].contentDocument == null
  ) {
    return false;
  }
  let pathStyle =
    muralImage[0].contentDocument.documentElement.children[4].attributes.style
      .nodeValue;
  pathStyle = pathStyle.replace(/ /g, "");
  console.log(pathStyle);
  var result = {},
    attributes = pathStyle.split(";");

  for (var i = 0; i < attributes.length; i++) {
    var entry = attributes[i].split(":");
    //@ts-ignore
    result[entry.splice(0, 1)[0]] = entry.join(":");
  }
  //@ts-ignore
  let opacity = result.opacity;
  console.log(opacity);

  if (opacity == 1) {
    return true;
  } else {
    return false;
  }
}

async function loopGreenCheck() {
  while (true) {
    await wait(2000);
    console.log("loop")
    let isGreen = checkForGreen();
    console.log(isGreen)
    if (isGreen) {
      console.log("puzzle complete, make sure to do stuff here");
      return;
    }
  }
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class Puzzle3 extends React.Component {
  componentDidMount() {
    loopGreenCheck();
  }

  render() {
    return (
      <View style={styles.container}>
        <object
          type="image/svg+xml"
          data={Mural}
          height="100%"
          id="mural-image"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
