import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Button,
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
import { Howl, Howler } from "howler";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const soundDirectory = "/static/sfx/"; // add music object and function that loops and fades between music (if we do music)

Howler.volume(0.6)

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const sounds = {
  start: new Howl({
    src: [soundDirectory + "start.mp3"]
  }),
  button: new Howl({
    src: [soundDirectory + "button.mp3"]
  }),
  shutdown: new Howl({
    src: [soundDirectory + "shutdown.mp3"]
  }),
};

export function playSound(sound: string) {
  if(sounds[sound] == undefined) {
    console.warn("sound " + sound + "not found");
    return;
  }
  console.log("attempting to playing sound " + sound)
  sounds[sound].play();
}

export class SoundTest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          source={require("../../../assets/dylan-temp.jpg")}
        >
          {Object.keys(sounds).map(key => (
            <Button title={key} onPress={() => playSound(key)}/>
          ))}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
});
