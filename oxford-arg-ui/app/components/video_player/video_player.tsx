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
import ReactPlayer from "react-player/lazy";
import { transcriptStrings } from "./transcript_strings";
import { goto, increment } from "../status_system/status_system";

let thatP: any;
let thatT: any;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const urls = {
  Scene1Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 1 Line 1 Alonso v3.mp4"),
  Scene3Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 3 Line 1 Alonso.mp4"),
  Scene4Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 4 Line 1 Alonso.mp4"),
  Scene6Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 6 Line 1 Alonso.mp4"),
  Scene7Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 7 Line 1 Alonso.mp4"),
  Scene9Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 9 Line 1 Alonso.mp4"),
  Scene9Line2:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 9 Line 2 Alonso v3.mp4"),
  Scene11Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 11 Line 1 VIRIDOS.mp4"),
  Scene12Line2:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 12 Line 2 Fong.mp4"),
  Scene13Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 13 Line 1 Fong.mp4"),
  Scene14Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 14 Line 1 Fong.mp4"),
  Scene15Line2:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 15 Line 2 Hernandez.mp4"),
  Scene24Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 24 Line 1 Vasquez.mp4"),
  Scene26Line1:
    encodeURI("https://static.viridos.toadtoad.xyz/communicator-clips/Scene 26 Line 1 Hogan.mp4"),
};

export { urls };

export function queuePlayer(line: string, blockGoto?: boolean) {
  if (blockGoto == undefined) {
    blockGoto = false;
  }
  thatP.queuePlayer(line, blockGoto);
  setTranscriptLine(line);
}

export class VideoPlayer extends React.Component {
  // add function to check for current position, and other to queue up a goto
  player: any;

  constructor(props) {
    super(props);
    this.player;
    this.state = {
      playing: false,
      video: "",
      blockGoto: false,
    };
    thatP = this;
  }

  queuePlayer(url: string, blockGoto: boolean) {
    let boo = true;
    if (urls[url] == undefined) {
      boo = false;
    }
    this.setState({ video: url, playing: boo, blockGoto });
    // setup wait for goto
  }

  ref = (player: any) => {
    this.player = player;
  };

  handleEnd() {
    this.setState({ playing: false, video: "" });
    if (this.state.blockGoto) {
      this.setState({ blockGoto: true });
    } else {
      (async function () {
        await goto(await increment());
      })();
    }
  }

  render() {
    if (this.state.playing) {
      return (
        <View style={[styles.container, { overflow: "hidden" }]}>
          <ReactPlayer
            ref={this.ref}
            url={urls[this.state.video]}
            height="100%"
            width="100%"
            playing={this.state.playing}
            onEnded={() => this.handleEnd()}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, { overflow: "hidden" }]}>
          <ReactPlayer
            width={0.2 * 0.9 * deviceWidth}
            url="https://static.viridos.toadtoad.xyz/communicator-clips/Communicator%20Loop%20v3.mp4" // insert loop here
            playing={true}
            muted={true}
            loop={true}
          />
        </View>
      );
    }
  }
}

export declare interface TranscriptProps extends ViewProperties {
  style: any;
}

export function setTranscriptStr(str: string) {
  thatT.setTranscript(str);
}

export function setTranscriptLine(line: string) {
  if (transcriptStrings[line] == undefined) {
    return;
  }
  thatT.setTranscript(transcriptStrings[line]);
}

export class Transcript extends React.Component<TranscriptProps> {
  style: any;
  state: any;

  constructor(props) {
    super(props);
    this.style = props.style;
    this.state = {
      str: "",
    };
    thatT = this;
  }

  setTranscript(str: string) {
    this.setState({ str });
  }

  render() {
    return <Text style={this.style}>{this.state.str}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
