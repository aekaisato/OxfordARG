import React from "react";
import { StyleSheet, View, Dimensions, Text, ViewProperties } from "react-native";
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
//@ts-ignore
import butterchurn from "butterchurn";
//@ts-ignore
import butterchurnPresets from "butterchurn-presets";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let audioCtx = new AudioContext();

let canvas;

let visualizer: any;

let presets = butterchurnPresets.getPresets();
let preset = presets["Eo.S. + Phat - cubetrace - v2"];

function initVisualizer() {
  canvas = document.querySelector("#milkdropCanvas");
  visualizer = butterchurn.createVisualizer(audioCtx, canvas, {
    height: (6 * deviceHeight) / 7,
    width: (5 * deviceWidth) / 9,
  });
  visualizer.loadPreset(preset, 0.0);
  //visualizer.setRendererSize((5 * deviceWidth) / 9, (6 * deviceHeight) / 7);
  startRenderer();
}

function startRenderer() {
  requestAnimationFrame(() => startRenderer());
  visualizer.render();
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export declare interface SplashScreenProps extends ViewProperties {
  showText?: boolean;
}

export class SplashScreen extends React.Component<SplashScreenProps> {
  showText: boolean;
  constructor(props) {
    super(props);
    if (props.showText == undefined) {
      this.showText = true;
    } else {
      this.showText = props.showText;
    }
  }

  componentDidMount() {
    initVisualizer();
  }

  render() {
    let text;
    if (this.showText) {
      text = (
        <Text
          style={{
            position: "absolute",
            marginLeft: "center",
            marginRight: "center",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "white",
            textShadowRadius: 20,
            textShadowColor: "black",
            fontFamily: "VT323",
            fontSize: deviceWidth / 24,
          }}
        >
          ViriDOS is awaiting input.
        </Text>
      );
    } else {
      text = <View />;
    }
    return (
      <View style={styles.container}>
        <canvas
          width={(5 * deviceWidth) / 9}
          height={(6 * deviceHeight) / 7}
          id="milkdropCanvas"
        ></canvas>
        {text}
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
