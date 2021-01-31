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
import { goto, increment } from "../status_system/status_system";
import {
  setTranscriptLine,
  setTranscriptStr,
} from "../video_player/video_player";
import {
  getCurrentPhase,
  navigatePhase,
  navigatePuzzle,
} from "../navigation/navigation";

const REFRESH_INTERVAL = 250;
let queue: any[] = [];

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

//  const FOLDER_PATH = "https://static.viridos.toadtoad.xyz/livefeed-clips/";
const FOLDER_PATH = "https://s3-us-west-1.amazonaws.com/static.viridos.toadtoad.xyz/livefeed-clips/";

const urls = {
  Scene1: encodeURI(FOLDER_PATH + "Scene 1 VIRIDOS.mp4"),
  Scene2: encodeURI(FOLDER_PATH + "Scene 2 Line 1 VIRIDOS v2.mp4"),
  Scene5: encodeURI(FOLDER_PATH + "Scene 5 Line 1 VIRIDOS v3.mp4"),
  Scene8: encodeURI(FOLDER_PATH + "Scene 8 Line 1 VIRIDOS.mp4"),
  Scene9: encodeURI(FOLDER_PATH + "Scene 9 RP Mural.mp4"),
  Scene12: encodeURI(FOLDER_PATH + "Scene 12 Line 1 VIRIDOS.mp4"),
  Scene15: encodeURI(FOLDER_PATH + "Scene 15 Line 1 VIRIDOS.mp4"),
  Scene17: encodeURI(FOLDER_PATH + "Scene 17 VIRIDOS.mp4"),
  Scene18: encodeURI(FOLDER_PATH + "Scene 18 VIRIDOS.mp4"),
  Scene20: encodeURI(FOLDER_PATH + "Scene 20 VIRIDOS.mp4"),
  Scene22: encodeURI(FOLDER_PATH + "Scene 22 VIRIDOS.mp4"),
  Scene23: encodeURI(FOLDER_PATH + "Scene 23 VIRIDOS.mp4"),
  Scene24: encodeURI(FOLDER_PATH + "Scene 24 VIRIDOS.mp4"),
  Scene25: encodeURI(FOLDER_PATH + "Scene 25 Line 4 VIRIDOS.mp4"),
  Scene26: encodeURI(FOLDER_PATH + "Scene 26 VIRIDOS.mp4"),
  Scene27: encodeURI(FOLDER_PATH + "Scene 27 VIRIDOS.mp4"),
  Scene28: encodeURI(FOLDER_PATH + "Scene+28-30+Final+Reveal.mp4"),
  Tutorial: encodeURI(FOLDER_PATH + "Tutorial.mp4"),
};

const transcriptFeedLines = {
  Scene2: `ViriDOS: Welcome, everyone, and thank you for taking the time to join us today. Oxford Academy is a Gold Ribbon School and a National Blue Ribbon School. It is ranked #2 in California and #19 in the nation by the US News and World Report in 2020. Please keep your hands, arms, feet and legs, inside your house while the robot is movi-`,
  Scene5: `ViriDOS: Oxford is dedicated to career success as seen through our pathway programs. Here our biomed pathway takes its classes. Up ahead is our athletic facilities where our soccer field, baseball field, softball field, track, and...track...are...loca-`,
  Scene8: `ViriDOS: dak bal (chicken foot), so bal (cow foot), lechuga (lettuce), sandia (watermelon), an yong (hello), ganso (goose), eum ma eui sone mat (mom's handmade food)`,
  Scene12: `ViriDOS: Welcome to the English building. Not only are English classes taught here, but also our yearbook, ASB, and our school newspaper the Gamut meet in these classrooms as well.`,
  Scene15: `ViriDOS: We are approaching the hallway to the main office, the brains of Oxford. Our administrators work -`,
  Scene17: `ViriDOS: As we approach the math building, I'd like to take this opportunity to tell explain the different math tracks we-`,
  Scene18: `ViriDOS: This is our science wing. We have a variety of courses and clubs associated with science.`,
  Scene21: `ViriDOS: Welcome to the Language Building. At Oxford we offer, Spanish and Korean languages. Additionally, we also have two of our pathways in this building Virtual Enterprise and Engineering.`,
  Scene22: `wheres the transcript, *brandon*?`,
  Scene23: `ViriDOS: As we approach the locker rooms, I'd like to take this chance to let you know about the plethora of athletics Oxford offers. Despite us being an academic school, we do-`,
  Scene25: `ViriDOS: Oxford is part of the Anaheim Union High School District...`,
  Tutorial: `transcript go brrrrrr`,
};

export { urls };

export function queueLiveFeed(
  line: string,
  blockGoto?: boolean,
  endAt?: number,
  splashScreenOnEnd?: boolean
) {
  if (blockGoto == undefined) {
    blockGoto = false;
  }
  if (splashScreenOnEnd == undefined) {
    splashScreenOnEnd = false;
  }
  let queueObj = { line, blockGoto, endAt, splashScreenOnEnd };
  queue.push(queueObj);
  if (transcriptFeedLines[line] != undefined) {
    setTranscriptStr(transcriptFeedLines[line]);
  }
}

export function queueStopLiveFeed() {
  queue.push("STOP");
}

export class LiveFeed extends React.Component {
  // add function to check for current position, and other to queue up a goto
  player: any;
  phase: any;

  constructor(props: any) {
    super(props);
    this.player;
    this.state = {
      playing: false,
      video: "",
      blockGoto: false,
      splashScreenOnEnd: false,
      isActive: true,
    };
    // if(props.phase == undefined) {
    //   props.phase = -1;
    // }
    // this.phase = props.phase;
  }

  async checkForVideos() {
    while (true) {
      if (queue.length > 0) {
        let currentPhase = getCurrentPhase();
        let objPhase = this.state.phase;
        console.log("obj phase");
        console.log(objPhase);
        console.log("current phase");
        console.log(currentPhase);
        if (objPhase != currentPhase) {
          console.log("obj phase and current phase do not match");
        } else {
          let video = queue.shift();
          if (video == "STOP") {
            this.handleEnd();
          } else {
            this.queuePlayer(
              video.line,
              video.blockGoto,
              video.endAt,
              video.splashScreenOnEnd
            );
          }
        }
      }
      await wait(REFRESH_INTERVAL);
    }
  }

  queuePlayer(
    url: string,
    blockGoto: any,
    endAt: number,
    splashScreenOnEnd: boolean
  ) {
    if (!this.state.isActive) {
      return;
    }
    let boo = true;
    if (urls[url] == undefined) {
      boo = false;
    }
    this.setState({
      video: url,
      playing: boo,
      blockGoto,
      endAt,
      splashScreenOnEnd,
    });
    // setup wait for goto
  }

  ref = (player: any) => {
    this.player = player;
  };

  handleEnd() {
    this.setState({ playing: false, video: "" });
    if (this.state.splashScreenOnEnd) {
      navigatePuzzle("SplashScreen");
      this.setState({ splashScreenOnEnd: false });
    }
    if (this.state.blockGoto) {
      this.setState({ blockGoto: true });
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
    let phaseTemp = getCurrentPhase();
    console.log("mounted live feed");
    console.log(phaseTemp);
    this.setState({ phase: phaseTemp });
    this.checkForVideos();
  }

  render() {
    if (this.state.playing) {
      return (
        <View style={styles.container}>
          <NavigationEvents
            onDidBlur={() => {
              console.log("blur live feed");
              this.setState({ isActive: false });
            }}
            onDidFocus={() => {
              console.log("focus live feed");
              this.setState({ isActive: true });
            }}
          />
          <ReactPlayer
            ref={this.ref}
            url={urls[this.state.video]}
            height={(6 * deviceHeight) / 7}
            width={(32 / 21) * deviceWidth}
            playing={this.state.playing}
            onEnded={() => this.handleEnd()}
            onProgress={(callback) => this.handleProgress(callback)}
            stopOnUnmount={true}
          />
        </View>
      );
    } else {
      return <View style={styles.container}></View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    overflow: "hidden",
  },
});
