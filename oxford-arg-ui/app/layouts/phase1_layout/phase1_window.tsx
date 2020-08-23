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

export class Phase1Window extends React.Component<WindowProps> {
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
              borderColor: "#303030",
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
              borderColor: "#303030",
              borderTopWidth: 24,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderRightWidth: 4,
              shadowOpacity: 0.35,
              shadowRadius: 20,
            },
          ]}
        >
          <Text
            style={{
              margin: 4,
              color: "white",
              fontFamily: "Noto-Sans",
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
