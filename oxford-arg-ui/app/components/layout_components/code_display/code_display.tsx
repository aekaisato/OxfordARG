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
import {default as CodeSnippets} from "./code_snippets.json"

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export declare interface CodeProps extends ViewProperties {
  font?: string
  speed?: number
  color?: string
}

export class CodeDisplay extends React.Component<CodeProps> {
  font: string;
  state: any;
  speed: number
  color: string;
  constructor(props: Readonly<CodeProps>) {
    super(props);
    this.state = {
      index: 0
    }
    if (props.font == undefined) {
      this.font = "Courier-Prime"
    } else {
      this.font = props.font
    }
    if (props.speed == undefined) {
      this.speed = 750
    } else {
      this.speed = props.speed
    }
    if (props.color == undefined) {
      this.color = "white"
    } else {
      this.color = props.color
    }
  }

  async loopText() {
    while (true) {
      await wait(this.speed);
      let temp = this.state.index;
      if(temp == 9) {
        temp = 0
      } else {
        temp += 1;
      }
      this.setState({index: temp})
    }
  }

  async componentDidMount() {
    await this.loopText();
  }

  render() {
    return (
      <View style={[this.props.style, {overflow: "hidden"}]}>
        <Text style={{fontSize: 8, fontFamily: this.font, color: this.color}}>
          { //@ts-ignore
          window.atob(CodeSnippets[this.state.index])}
        </Text>
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
