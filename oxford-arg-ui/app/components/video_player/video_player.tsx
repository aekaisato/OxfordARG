import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
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

let that;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const urls = {
  Scene1Line1:
    "https://static.viridos.toadtoad.xyz/communicator-clips/Scene%201%20Line%201%20Alonso%20v3.mp4",
};

export { urls };

export function queuePlayer(url: string) {
  that.queuePlayer(url);
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
    };
    that = this;
  }

  queuePlayer(url: string) {
    this.setState({ video: url, playing: true });
    // setup wait for goto
    // overwrite transcript
  }

  ref = (player: any) => {
    this.player = player;
  };

  handleEnd() {
    this.setState({ playing: false, video: "" });
  }

  render() {
    if (this.state.playing) {
      return (
        <View style={styles.container}>
          <ReactPlayer
            ref={this.ref}
            url={urls[this.state.video]}
            width="100%"
            height="100%"
            playing={this.state.playing}
            onEnded={() => this.handleEnd()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://static.viridos.toadtoad.xyz/communicator-clips/Scene%2015%20Line%202%20Hernandez.mp4" // insert loop here
            playing={true}
            muted={true}
            loop={true}
          />
        </View>
      );
    }
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
