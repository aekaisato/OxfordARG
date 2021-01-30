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
  NavigationEvents,
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
import { getCurrentPhase } from "../navigation/navigation";

const REFRESH_INTERVAL = 250;
let queue: any[] = [];

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const FOLDER_PATH = "https://static.viridos.toadtoad.xyz/communicator-clips/";

const urls = {
  Scene1Line1: encodeURI(FOLDER_PATH + "Scene 1 Line 1 Alonso v3.mp4"),
  Scene3Line1: encodeURI(FOLDER_PATH + "Scene 3 Line 1 Alonso.mp4"),
  Scene4Line1: encodeURI(FOLDER_PATH + "Scene 4 Line 1 Alonso.mp4"),
  Scene6Line1: encodeURI(FOLDER_PATH + "Scene 6 Line 1 Alonso.mp4"),
  Scene7Line1: encodeURI(FOLDER_PATH + "Scene 7 Line 1 Alonso.mp4"),
  Scene9Line1: encodeURI(FOLDER_PATH + "Scene 9 Line 1 Alonso.mp4"),
  Scene9Line2: encodeURI(FOLDER_PATH + "Scene 9 Line 2 Alonso v3.mp4"),
  Scene10Line1: encodeURI(FOLDER_PATH + "Scene 10 Line 1 HOSHI V3.mp4"),
  Scene11Line1: encodeURI(FOLDER_PATH + "Scene 11 Line 1 VIRIDOS.mp4"),
  Scene12Line2: encodeURI(FOLDER_PATH + "Scene 12 Line 2 Fong.mp4"),
  Scene13Line1: encodeURI(FOLDER_PATH + "Scene 13 Line 1 Fong.mp4"),
  Scene14Line1: encodeURI(FOLDER_PATH + "Scene 14 Line 1 Fong.mp4"),
  Scene15Line2: encodeURI(FOLDER_PATH + "Scene 15 Line 2 Hernandez.mp4"),
  Scene17Line1: encodeURI(FOLDER_PATH + "Scene 17 Line 1 Worthington.mp4"),
  Scene19Line1: encodeURI(FOLDER_PATH + "Scene 19 Line 1 Tran.mp4"),
  Scene20Line1: encodeURI(FOLDER_PATH + "Scene 20 Line 1 Alonso.mp4"),
  Scene20Line2: encodeURI(FOLDER_PATH + "Scene 20 Line 2 HOHSI.mp4"),
  Scene22Line1: encodeURI(FOLDER_PATH + "Scene 22 Line 1 Siggson.mp4"),
  Scene23Line2: encodeURI(FOLDER_PATH + "Scene 23 Line 2 Jensen.mp4"),
  Scene23Line3: encodeURI(FOLDER_PATH + "Scene 23 Line 3 HOSHI.mp4"),
  Scene24Line1: encodeURI(FOLDER_PATH + "Scene 24 Line 1 Vasquez.mp4"),
  Scene25Line1: encodeURI(FOLDER_PATH + "Scene 25 Line 1 Whitney Rep.mp4"),
  Scene25Line2: encodeURI(FOLDER_PATH + "Scene 25 Line 2 HOSHI Rep.mp4"),
  Scene25Line3: encodeURI(FOLDER_PATH + "Scene 25 Line 3 HOSHI Rep.mp4"),
  Scene26Line1: encodeURI(FOLDER_PATH + "Scene 26 Line 1 Hogan.mp4"),
  Scene27Line1: encodeURI(FOLDER_PATH + "Scene 27 Line 1 Wei.mp4"),
  Scene27Line2: encodeURI(FOLDER_PATH + "Scene 27 Line 2 Whitney Rep.mp4"),
  Scene27Line3: encodeURI(FOLDER_PATH + "Scene 27 Line 3 Whitney Rep.mp4"),
  Scene28Line1: encodeURI(FOLDER_PATH + "Scene 28 Line 1 HOSHI.mp4"),
  Scene30Line1: encodeURI(FOLDER_PATH + "Scene 30 Line 1 HOSHI.mp4"),
  Scene30Line2: encodeURI(FOLDER_PATH + "Scene 30 Line 2 Alonso.mp4"),
};

export { urls };

export function queuePlayer(line: string, blockGoto?: boolean, endAt?: number) {
  if (blockGoto == undefined) {
    blockGoto = false;
  }
  let queueObj = { line, blockGoto, endAt };
  queue.push(queueObj);
}

export function queueStopPlayer() {
  queue.push("STOP");
}

interface VideoPlayerProps extends ViewProperties {
  phase?: number;
}

export class VideoPlayer extends React.Component<VideoPlayerProps> {
  // add function to check for current position, and other to queue up a goto
  player: any;
  phase: number;
  constructor(props: any) {
    super(props);
    this.player;
    this.state = {
      playing: false,
      video: "",
      blockGoto: false,
    };
    if (props.phase == undefined) {
      props.phase = -1;
    }
    this.phase = props.phase;
  }

  async checkForVideos() {
    while (true) {
      if (queue.length > 0) {
        let phase = getCurrentPhase();
        let thisPhase = "Phase" + this.phase;
        if (phase == thisPhase) {
          let video = queue.shift();
          if (video == "STOP") {
            this.handleEnd();
          } else {
            this.queuePlayer(video.line, video.blockGoto, video.endAt);
          }
        }
      }
      await wait(REFRESH_INTERVAL);
    }
  }

  queuePlayer(url: string, blockGoto: boolean, endAt: any) {
    let boo = true;
    if (urls[url] == undefined) {
      boo = false;
    }
    setTranscriptLine(url);
    this.setState({ video: url, playing: boo, blockGoto, endAt });
    // setup wait for goto
  }

  ref = (player: any) => {
    this.player = player;
  };

  handleEnd() {
    this.setState({ playing: false, video: "" });
    if (this.state.blockGoto) {
      this.setState({ blockGoto: false });
    } else {
      (async function () {
        await goto(await increment());
      })();
    }
  }

  handleProgress(callback: {
    played?: number;
    playedSeconds: any;
    loaded?: number;
    loadedSeconds?: number;
  }) {
    if (this.state.endAt != undefined) {
      if (callback.playedSeconds >= this.state.endAt) {
        (async function () {
          await goto(await increment());
        })();
        this.setState({ endAt: undefined, blockGoto: true });
      }
    }
  }

  componentDidMount() {
    this.checkForVideos();
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
            onProgress={(callback) => this.handleProgress(callback)}
            stopOnUnmount={true}
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

let transcript = "";

export declare interface TranscriptProps extends ViewProperties {
  style: any;
}

export function setTranscriptStr(str: string) {
  transcript = str;
}

export function setTranscriptLine(line: string) {
  if (transcriptStrings[line] == undefined) {
    return;
  }
  setTranscriptStr(transcriptStrings[line]);
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
  }

  setTranscript(str: string) {
    this.setState({ str });
  }

  async watchTranscript() {
    while (true) {
      if (this.state.str != transcript) {
        this.setTranscript(transcript);
      }
      await wait(REFRESH_INTERVAL);
    }
  }

  componentDidMount() {
    this.watchTranscript();
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
