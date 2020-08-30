import React from "react";
import { StyleSheet, View, Dimensions, Text, } from "react-native";
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

import html from "./flow-free-master/flow.html"

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class Puzzle2 extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <div dangerouslySetInnerHTML={{__html: html}}></div>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
});
