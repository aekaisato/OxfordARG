import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ViewProperties,
} from "react-native";
import ReactPlayer from "react-player/lazy";
import { transcriptStrings } from "./transcript_strings";
import { goto, increment } from "../status_system/status_system";
import { getCurrentPhase } from "../navigation/navigation";
import { NavigationEvents } from "react-navigation";

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
  Scene1Line1: encodeURI(FOLDER_PATH + "Scene 1 Line 1 Alonso v3.webm"),
  Scene3Line1: encodeURI(FOLDER_PATH + "Scene 3 Line 1 Alonso.webm"),
  Scene4Line1: encodeURI(FOLDER_PATH + "Scene 4 Line 1 Alonso.webm"),
  Scene6Line1: encodeURI(FOLDER_PATH + "Scene 6 Line 1 Alonso.webm"),
  Scene7Line1: encodeURI(FOLDER_PATH + "Scene 7 Line 1 Alonso.webm"),
  Scene9Line1: encodeURI(FOLDER_PATH + "Scene 9 Line 1 Alonso.webm"),
  // Scene9Line2: encodeURI(FOLDER_PATH + "Scene 9 Line 2 Alonso v3.webm"),
  // Scene10Line1: encodeURI(FOLDER_PATH + "Scene 10 Line 1 HOSHI V3.webm"),
  Scene10: encodeURI(FOLDER_PATH + "Scene 10 Alonso HOSHI.webm"),
  Scene11Line1: encodeURI(FOLDER_PATH + "Scene 11 Line 1 VIRIDOS.webm"),
  Scene12Line2: encodeURI(FOLDER_PATH + "Scene 12 Line 2 Fong.webm"),
  Scene13Line1: encodeURI(FOLDER_PATH + "Scene 13 Line 1 Fong.webm"),
  Scene14Line1: encodeURI(FOLDER_PATH + "Scene 14 Line 1 Fong.webm"),
  Scene14Line2: encodeURI(FOLDER_PATH + "Scene 14 Line 2 HOSHI.webm"),
  Scene15Line2: encodeURI(FOLDER_PATH + "Scene 15 Line 2 Hernandez.webm"),
  Scene16Line1: encodeURI(FOLDER_PATH + "Scene 16 Line 1 HOSHI.webm"),
  Scene17Line1: encodeURI(FOLDER_PATH + "Scene 17 Line 1 Worthington.webm"),
  Scene19Line1: encodeURI(FOLDER_PATH + "Scene 19 Line 1 Tran.webm"),
  Scene19Line2: encodeURI(FOLDER_PATH + "Scene 19 Line 2 HOSHI.webm"),
  Scene20Line1: encodeURI(FOLDER_PATH + "Scene 20 Line 1 Alonso.webm"),
  Scene20Line2: encodeURI(FOLDER_PATH + "Scene 20 Line 2 HOSHI.webm"),
  Scene20Error1: encodeURI(FOLDER_PATH + "Scene 20 Error Msg 1.webm"),
  Scene20Error2: encodeURI(FOLDER_PATH + "Scene 20 Error Msg 2.webm"),
  Scene20Error3: encodeURI(FOLDER_PATH + "Scene 20 Error Msg 3.webm"),
  Scene20Error4: encodeURI(FOLDER_PATH + "Scene 20 Error Msg 4.webm"),
  Scene21Line1: encodeURI(FOLDER_PATH + "Scene 21 - Stephan and Kim.webm"),
  Scene21Line2: encodeURI(FOLDER_PATH + "Scene 21 Stephan - HOSHI.webm"),
  Scene22Line1: encodeURI(FOLDER_PATH + "Scene 22 Line 1 Siggson.webm"),
  Scene22Line2: encodeURI(FOLDER_PATH + "Scene 22 Line 2 HOSHI.webm"),
  Scene23Line2: encodeURI(FOLDER_PATH + "Scene 23 Line 2 Jensen.webm"),
  Scene23Line3: encodeURI(FOLDER_PATH + "Scene 23 Line 3 HOSHI.webm"),
  Scene24Line1: encodeURI(FOLDER_PATH + "Scene+24+Line+1+Vasquez.webm"), // firefox error 416 workaround
  Scene25Line1: encodeURI(FOLDER_PATH + "Scene 25 Line 1 Whitney Rep.webm"),
  Scene25Line2: encodeURI(FOLDER_PATH + "Scene 25 Line 2 HOSHI Rep.webm"),
  Scene25Line3: encodeURI(FOLDER_PATH + "Scene 25 Line 3 HOSHI Rep.webm"),
  Scene25Error1: encodeURI(FOLDER_PATH + "Scene 25 Error Msg 1.webm"),
  Scene25Error2: encodeURI(FOLDER_PATH + "Scene 25 Error Msg 2.webm"),
  Scene25Error3: encodeURI(FOLDER_PATH + "Scene 25 Error Msg 3.webm"),
  Scene26Line1: encodeURI(FOLDER_PATH + "Scene 26 Line 1 Hogan.webm"),
  Scene26Line2: encodeURI(FOLDER_PATH + "Scene 26 Line 2 Hogan.webm"),
  Scene27Line1: encodeURI(FOLDER_PATH + "Scene 27 Line 1 Wei.webm"),
  Scene27Line2: encodeURI(FOLDER_PATH + "Scene 27 Line 2 Whitney Rep.webm"),
  Scene27Line3: encodeURI(FOLDER_PATH + "Scene 27 Line 3 Whitney Rep.webm"),
  Scene28Line1: encodeURI(FOLDER_PATH + "Scene 28 Line 1 HOSHI.webm"),
  Scene28Line2: encodeURI(FOLDER_PATH + "Scene 28 Line 2 HOSHI.webm"),
  Scene28Error1: encodeURI(FOLDER_PATH + "Scene 28 Error Msg 1.webm"),
  Scene28Error2: encodeURI(FOLDER_PATH + "Scene 28 Error Msg 2.webm"),
  Scene28Error3: encodeURI(FOLDER_PATH + "Scene 28 Error Msg 3.webm"),
  Scene28ErrorS: encodeURI(FOLDER_PATH + "Scene 28 Error Msg 4.webm"),
  Scene30Line1: encodeURI(FOLDER_PATH + "Scene 30 Line 1 HOSHI.webm"),
  Scene30Line2: encodeURI(FOLDER_PATH + "Scene 30 Line 2 Alonso.webm"),
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
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.player;
    this.state = {
      playing: false,
      video: "",
      blockGoto: false,
      isMounted: false,
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

  async queuePlayer(url: string, blockGoto: boolean, endAt: any) {
    let boo = true;
    if (urls[url] == undefined) {
      console.warn("video not found: " + url);
      boo = false;
    }
    setTranscriptLine(url);
    while (!this._isMounted) {
      await wait(250);
      console.log("waiting for mounted livefeed");
    }
    this.setState({ video: url, playing: boo, blockGoto, endAt });
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
    console.log("video player component did mount")
    this.checkForVideos();
    this._isMounted = true;
  }

  componentWillUnmount() {
    console.log("video player component will unmount")
    this._isMounted = false;
  }

  render() {
    if (this.state.playing) {
      return (
        <View style={[styles.container, { overflow: "hidden" }]}>
          <NavigationEvents
            onDidFocus={() => {
              console.log("focusing video player");
              this.forceUpdate();
            }}
            onWillBlur={() => console.log("blurring video player")}
          />
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
            url="https://static.viridos.toadtoad.xyz/communicator-clips/Communicator%20Loop%20v3.webm" // insert loop here
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
