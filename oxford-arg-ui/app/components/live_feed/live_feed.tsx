import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ViewProperties,
} from "react-native";
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

const FOLDER_PATH = "https://static.viridos.toadtoad.xyz/livefeed-clips/";

const urls = {
  Scene1: encodeURI(FOLDER_PATH + "Scene 1 VIRIDOS.webm"),
  Scene2: encodeURI(FOLDER_PATH + "Scene 2 Line 1 VIRIDOS v2.webm"),
  Scene5: encodeURI(FOLDER_PATH + "Scene 5 Line 1 VIRIDOS v3.webm"),
  Scene8: encodeURI(FOLDER_PATH + "Scene 8 Line 1 VIRIDOS.webm"),
  Scene9: encodeURI(FOLDER_PATH + "Scene 9 RP Mural.webm"),
  Scene12: encodeURI(FOLDER_PATH + "Scene 12 Line 1 VIRIDOS.webm"),
  Scene15: encodeURI(FOLDER_PATH + "Scene 15 Line 1 VIRIDOS.webm"),
  Scene17: encodeURI(FOLDER_PATH + "Scene 17 VIRIDOS.webm"),
  Scene18: encodeURI(FOLDER_PATH + "Scene 18 VIRIDOS.webm"),
  Scene20: encodeURI(FOLDER_PATH + "Scene 20 VIRIDOS.webm"),
  Scene22: encodeURI(FOLDER_PATH + "Scene 22 VIRIDOS.webm"),
  Scene23: encodeURI(FOLDER_PATH + "Scene 23 VIRIDOS.webm"),
  Scene24: encodeURI(FOLDER_PATH + "Scene 24 VIRIDOS.webm"),
  Scene25: encodeURI(FOLDER_PATH + "Scene 25 Line 4 VIRIDOS.webm"),
  Scene26: encodeURI(FOLDER_PATH + "Scene 26 VIRIDOS.webm"),
  Scene27: encodeURI(FOLDER_PATH + "Scene 27 VIRIDOS.webm"),
  Scene28: encodeURI(FOLDER_PATH + "Scene+28-30+Final+Reveal.webm"),
  Tutorial: encodeURI(FOLDER_PATH + "Tutorial.webm"),
};

const transcriptFeedLines = {
  Scene2: `ViriDOS: Welcome, everyone, and thank you for taking the time to join us today. Oxford Academy is a Gold Ribbon School and a National Blue Ribbon School. It is ranked #2 in California and #19 in the nation by the US News and World Report in 2020. Please keep your hands, arms, feet and legs, inside your house while the robot is movi-`,
  Scene5: `ViriDOS: Oxford is dedicated to career success as seen through our pathway programs. Here our biomed program takes its classes. Up ahead is our athletic facilities where our soccer field, baseball field, softball field, track, and...track...are...loca-`,
  Scene8: `ViriDOS: Here at Oxford we offer both Spanish and Korean languages. Students take a cultures and conversations course in 7th grade to experience...dak bal (chicken foot), so bal (cow foot), lechuga (lettuce), sandia (watermelon), an yong (hello), ganso (goose), eum ma eui sone mat (mom's handmade food)`,
  Scene12: `ViriDOS: Welcome to the English building. Not only are English classes taught here, but also our yearbook, ASB, and our school newspaper the Gamut meet in these classrooms as well.`,
  Scene15: `ViriDOS: We are approaching the hallway to the main office, the brains of Oxford. Our administrators work -`,
  Scene17: `ViriDOS: As we approach the math building, I'd like to take this opportunity to tell explain the different math tracks we-`,
  Scene18: `ViriDOS: This is our science wing. We have a variety of courses and clubs associated with science. Oxford offers courses in biology, chemistry, environmental science, and physics.`,
  Scene21: `ViriDOS: Welcome to the Language Building. At Oxford we offer, Spanish and Korean languages. Additionally, we also have two of our pathways in this building Virtual Enterprise and Engineering.`,
  Scene22: `ViriDOS: Welcome to the history building, the capsule to Earth's past. We offer a variety classes from European, American, and World History as well as American Government and Economics.`,
  Scene23: `ViriDOS: As we approach the locker rooms, I'd like to take this chance to let you know about the plethora of athletics Oxford offers. Despite us being an academic school, we do-`,
  Scene25: `ViriDOS: Oxford is part of the Anaheim Union High School District-`,
  Tutorial: `Welcome to the Viridis Disk Operating System, or ViriDOS. This is a guide for the operation of the Remote Desktop feature. ViriDOS uses mounted cameras and an experimental gyroscope configuration to allow you to see the campus, and explore several of its locations. Sometimes, the tour will remain automated. However, in many circumstances, control will be handed to you, the user, to look through classrooms. In this case, you may drag the camera view with your mouse to look around. If you see an icon like this one, you may hover over with the mouse to see more information. Clicking on the button may also have an effect, though this only applies to some of the buttons. Let’s take you around other elements of the screen. While much of the tour would be conducted through ViriDOS’s on board text-to-speech engine, others may use this communicator to talk with you during your tour. A transcript of what they’re saying is available here. ViriDOS may also pick up and digitally scan objects. You can see your inventory by pressing the “open inventory” button. Finally, this bar tracks your progress on the tour, and this bar will show you others’ progress on their tour. Thank you for using ViriDOS, and we hope you enjoy your tour.`,
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
  player: any;
  phase: any;
  _isMounted = false;
  _intervalID!: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.player;
    this.state = {
      playing: false,
      video: "",
      blockGoto: false,
      splashScreenOnEnd: false,
    };
    // if(props.phase == undefined) {
    //   props.phase = -1;
    // }
    // this.phase = props.phase;
  }

  async checkForVideos() {
    //while (true) {
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
    //  await wait(REFRESH_INTERVAL);
    //}
  }

  async queuePlayer(
    url: string,
    blockGoto: any,
    endAt: number,
    splashScreenOnEnd: boolean
  ) {
    let boo = true;
    if (urls[url] == undefined) {
      console.warn("video not found: " + url);
      boo = false;
    }
    while (!this._isMounted) {
      await wait(250);
      console.log("waiting for mounted livefeed");
    }
    this.setState({
      video: url,
      playing: boo,
      blockGoto,
      endAt,
      splashScreenOnEnd,
    });
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
    console.log("live feed component did mount");
    let phaseTemp = getCurrentPhase();
    console.log("mounted live feed");
    console.log(phaseTemp);
    this.setState({ phase: phaseTemp });
    this._isMounted = true;
    //this.checkForVideos();
    this._intervalID = setInterval(
      async () => await this.checkForVideos(),
      REFRESH_INTERVAL
    );
  }

  componentWillUnmount() {
    console.log("live feed component will unmount");
    this._isMounted = false;
    clearInterval(this._intervalID);
  }

  render() {
    let player;
    if (this.state.playing) {
      player = (
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
      );
    } else {
      player = (
        <Text>
          {
            "You should not see this text.\n(This isn't part of the puzzle; this is actually a bug.)\nPlease refresh your page."
          }
        </Text>
      );
    }
    return <View style={styles.container}>{player}</View>;
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
