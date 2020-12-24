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
import SoundfontProvider from "./SoundfontProvider";
import { goto, increment } from "../../components/status_system/status_system";
const _ = require('lodash');

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

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

  state = {
    notes: [0, 0, 0, 0],
  };

  notePlayed(midiNumber: any) {
    this.setState(
      { notes: [...this.state.notes.splice(1), midiNumber] },
      () => {
        if (_.isEqual(this.state.notes, [57, 50, 52, 55])) {
          console.log("finished, do smth here");
          (async function(){
            await wait(2000);
            await goto(await increment());
          })();
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/img/piano.png")}
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
            <SoundfontProvider
              intrumentName="acoustic_grand_piano"
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <Piano
                  noteRange={{ first: this.firstNote, last: this.lastNote }}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  width={deviceWidth / 3}
                  onPlayNoteInput={(note: any) => this.notePlayed(note)}
                />
              )}
            ></SoundfontProvider>
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
