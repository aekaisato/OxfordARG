import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
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
import { TextInput } from "react-native-gesture-handler";
import md5 from "crypto-js/md5";
//@ts-ignore
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle14 extends React.Component {
  // add blurred background of classroom

  componentDidMount() {}

  firstNote = MidiNumbers.fromNote("c3");
  lastNote = MidiNumbers.fromNote("b3");
  keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: this.firstNote,
    lastNote: this.lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  state = {};
  
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/img/ptable.png")}
          style={{ height: "60%", width: "100%" }}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View>
            <Piano
              noteRange={{ first: this.firstNote, last: this.lastNote }}
              playNote={(midiNumber) => {
                // Play a given note - see notes below
              }}
              stopNote={(midiNumber) => {
                // Stop playing a given note - see notes below
              }}
              width={deviceWidth/3}
              keyboardShortcuts={this.keyboardShortcuts}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
