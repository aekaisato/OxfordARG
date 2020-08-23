import React from "react";
import { StyleSheet, View, Dimensions, ViewProperties } from "react-native";
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

export class ProgressLeaderboard extends React.Component<ViewProperties> {
  // add firebase stuff here
  constructor(props: Readonly<ViewProperties>) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            borderColor: "black",
            borderLeftWidth: 3,
            borderRightWidth: 3,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        {/* leaderboard dots go here */}
        <View
        style={[
          this.props.style,
          {
            borderColor: "black",
            borderWidth: 1.5,
            position: "absolute",
            left: -3,
            height: 0
          },
        ]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
