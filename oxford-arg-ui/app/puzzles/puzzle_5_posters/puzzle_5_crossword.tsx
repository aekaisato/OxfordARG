import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
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
  Text,
} from "@ui-kitten/components";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class Puzzle5Crossword extends React.Component {
  // insert picture of wall in office
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/img/poster.png")}
          style={{ height: "47%", width: "100%" }}
          resizeMode="contain"
        />
        <Image
          source={require("../../../assets/img/crossword.png")}
          style={{ height: "47%", width: "100%" }}
          resizeMode="contain"
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
  },
});
