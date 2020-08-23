import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ViewProperties,
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

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export declare interface WindowProps extends ViewProperties {
  windowName?: string;
  children?: any;
}

export class Phase3Window extends React.Component<WindowProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.windowName == undefined) {
      return (
        <View
          style={[
            this.props.style,
            {
              borderColor: "red",
              borderTopWidth: 4,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderRightWidth: 4,
            },
          ]}
        >
          {this.props.children}
        </View>
      );
    } else {
      return (
        <View
          style={[
            this.props.style,
            {
              borderColor: "red",
              borderTopWidth: 4,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderRightWidth: 4,
            },
          ]}
        >
          <View
            style={{
              width: 11*this.props.windowName.length,
              height: 0,
              borderBottomWidth: 20,
              borderBottomColor: "red",
              borderLeftColor: "transparent",
              borderRightWidth: 20,
              borderRightColor: "transparent",
              borderStyle: "solid",
              position: "absolute",
              top: -20,
              left: -4
            }}
          />
          <Text
            style={{
              margin: 4,
              color: "black",
              fontFamily: "VT323",
              fontSize: 18,
              position: "absolute",
              top: -24,
              left: -4,
            }}
          >
            {this.props.windowName.toUpperCase()}
          </Text>
          {this.props.children}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
