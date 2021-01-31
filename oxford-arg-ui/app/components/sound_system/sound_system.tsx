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

const soundDirectory = "/static/sfx/";
const musicDirectory = "/static/mus/";

Howler.volume(0.6);
const MUSIC_VOLUME = 0.2;
const USE_HTML5 = false;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const sounds = {
  start: new Howl({
    src: [soundDirectory + "start.mp3"],
  }),
  button: new Howl({
    src: [soundDirectory + "button.mp3"],
  }),
  shutdown: new Howl({
    src: [soundDirectory + "shutdown.mp3"],
  }),
};

const music = {
  mus1: new Howl({
    src: [musicDirectory + "mus1.mp3"],
    html5: USE_HTML5,
  }),
  mus2: new Howl({
    src: [musicDirectory + "mus2.mp3"],
    html5: USE_HTML5,
  }),
  mus3: new Howl({
    src: [musicDirectory + "mus3.mp3"],
    html5: USE_HTML5,
    sprite: {
      startLoop: [38492, 76834],
      loop: [0, 115226, true],
    },
  }),
};

let musCurrent: string | null | undefined;

export function playSound(sound: string) {
  if (sounds[sound] == undefined) {
    console.warn("sound " + sound + "not found");
    return;
  }
  console.log("attempting to playing sound " + sound);
  sounds[sound].play();
}

export async function playMusic(track: string) {
  await stopCurrentTrack();
  if (music[track] == undefined) {
    console.warn("track " + track + "not found");
    return;
  }
  music[track].volume(MUSIC_VOLUME);
  music[track].loop(true);
  console.log("attempting to playing track " + track);
  console.log(music[track]);
  if (
    music[track]._sprite.__default != undefined ||
    Object.keys(music[track]._sprite).length == 0
  ) {
    console.log("normal loop");
    music[track].play();
  } else {
    console.log("sprite loop");
    let keys = Object.keys(music[track]._sprite);
    music[track].loop(false);
    music[track].once("end", () => {
      if (keys.length >= 1) {
        music[track].play(keys[1]);
      }
    });
    music[track].volume(0);
    music[track].play(keys[0]);
    music[track].fade(0, MUSIC_VOLUME, 1000);
  }
  musCurrent = track;
}

export async function stopCurrentTrack(fadeDuration?: number) {
  if (musCurrent == undefined || musCurrent == null) {
    return;
  }
  if (!fadeDuration) {
    fadeDuration = 1000;
  }
  music[musCurrent].fade(MUSIC_VOLUME, 0, fadeDuration);
  await wait(fadeDuration);
  music[musCurrent].stop();
}

export class SoundTest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.container}
          source={require("../../../assets/dylan-temp.jpg")}
        >
          {Object.keys(sounds).map((key) => (
            <Button title={key} onPress={() => playSound(key)} />
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
