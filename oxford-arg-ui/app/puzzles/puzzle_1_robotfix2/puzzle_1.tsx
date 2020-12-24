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
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";

// import {goto, increment} from "../../components/status_system/status_system"

import html from "./flow-free-master/flow.html";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class Puzzle1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.container, {alignItems: "center"}]}
          source={require("../../../assets/backdrops/puzzle_1.jpg")}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} style={{boxShadow: "0px 0px 20px"}}></div>
        </ImageBackground>
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
