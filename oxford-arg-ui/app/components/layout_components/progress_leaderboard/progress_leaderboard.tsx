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

export declare interface LeaderboardProps extends ViewProperties {
  color?: string
}

export class ProgressLeaderboard extends React.Component<LeaderboardProps> {
  color: string;
  // add firebase stuff here
  constructor(props: Readonly<LeaderboardProps>) {
    super(props);
    this.state = {};
    if (props.color == undefined) {
      this.color = "black"
    } else {
      this.color = props.color
    }
  }
  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            borderColor: this.color,
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
            borderColor: this.color,
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
