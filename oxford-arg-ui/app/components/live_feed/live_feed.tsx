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
import {
  setTranscriptLine,
  setTranscriptStr,
} from "../video_player/video_player";

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
  Scene1: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 1 VIRIDOS.mp4"
  ),
  Scene2: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 2 Line 1 VIRIDOS v2.mp4"
  ),
  Scene5: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 5 Line 1 VIRIDOS v3.mp4"
  ),
  Scene8: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 8 Line 1 VIRIDOS.mp4"
  ),
  Scene9: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 9 RP Mural.mp4"
  ),
  Scene12: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 12 Line 1 VIRIDOS.mp4"
  ),
  Scene15: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 15 Line 1 VIRIDOS.mp4"
  ),
  Scene24: encodeURI(
    "https://static.viridos.toadtoad.xyz/livefeed-clips/Scene 24 VIRIDOS.mp4"
  ),
};

const transcriptFeedLines = {
  Scene2: 'VIRIDOS: Welcome, everyone, and thank you for taking the time to join us today. Oxford Academy is a Gold Ribbon School and a National Blue Ribbon School. It is ranked #2 in California and #19 in the nation by the US News and World Report in 2020. Please keep your hands, arms, feet and legs, inside your house while the robot is movi-',
  Scene5: `VIRIDOS: Oxford is dedicated to career success as seen through our pathway programs. Here our biomed pathway takes its classes. Up ahead is our athletic facilities where our soccer field, baseball field, softball field, track, and...track...are...loca-`,
  Scene8: `VIRIDOS: dak bal (chicken foot), so bal (cow foot), lechuga (lettuce), sandia (watermelon), an yong (hello), ganso (goose), eum ma eui sone mat (mom's handmade food)`,
  Scene12: `VIRIDOS: Welcome to the English building. Not only are English classes taught here, but also our yearbook, ASB, and our school newspaper the Gamut meet in these classrooms as well.`,
  Scene15: `VIRIDOS: We are approaching the hallway to the main office, the brains of Oxford. Our administrators work -`,
  Scene17: `VIRIDOS: As we approach the math building, I'd like to take this opportunity to tell explain the different math tracks we-`,
  Scene18: `VIRIDOS: This is our science wing. We have a variety of courses and clubs associated with science.`,
  Scene21: `VIRIDOS: Welcome to the Language Building. At Oxford we offer, Spanish and Korean languages. Additionally, we also have two of our pathways in this building Virtual Enterprise and Engineering.`,
  Scene23: `VIRIDOS: As we approach the locker rooms, I'd like to take this chance to let you know about the plethora of athletics Oxford offers. Despite us being an academic school, we do-`,
  Scene25: `VIRIDOS: Oxford is part of the Anaheim Union High School District...`,
};

export { urls };

export function queueLiveFeed(line: string, blockGoto?: boolean) {
  if (blockGoto == undefined) {
    blockGoto = false;
  }
  thatP.queuePlayer(line, blockGoto);
  if (transcriptFeedLines[line] != undefined) {
    setTranscriptStr(transcriptFeedLines[line]);
  }
}

export class LiveFeed extends React.Component {
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
    console.log("thatP: " + thatP);
  }

  queuePlayer(url: string, blockGoto: any) {
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
        <View style={styles.container}>
          <ReactPlayer
            ref={this.ref}
            url={urls[this.state.video]}
            height={(6 * deviceHeight) / 7}
            width={(32 / 21) * deviceWidth}
            playing={this.state.playing}
            onEnded={() => this.handleEnd()}
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
