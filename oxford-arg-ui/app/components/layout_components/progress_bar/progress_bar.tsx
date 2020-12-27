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

let that: any;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let progress = 0.0; // num from 0 to 1

export function setProgress(val: number) {
  progress = val;
  that.forceUpdate();
}

export declare interface ProgressProps extends ViewProperties {
  value: number;
  color: string;
}

export class ProgressBar extends React.Component<ProgressProps> {
  constructor(props: Readonly<ProgressProps>) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    that = this;
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          { borderColor: this.props.color, borderWidth: 4, overflow: "hidden" },
        ]}
      >
        <View
          style={[
            this.props.style,
            {
              position: "absolute",
              left: -4,
              top: -4,
              backgroundColor: this.props.color,
              width: progress * 100 + 1 + "%",
            },
          ]}
        ></View>
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
