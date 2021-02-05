import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import {
  NavigationEvents,
} from "react-navigation";
import { playSound } from "../components/sound_system/sound_system";
import ReactPlayer from "react-player/lazy";
import { goto, increment } from "../components/status_system/status_system";

let that: any;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function performAnimation() {
  playSound("shutdown");
  await wait(6000);
  console.log("continue");
  that.playVideo();
  await wait(25000);
  goto(await increment());
}

export class BlackoutTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    that = this;
  }

  playVideo() {
    this.setState({ playing: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => performAnimation()} />
        <ReactPlayer
          url="https://static.viridos.toadtoad.xyz/other-clips/bootup_sequence.webm"
          width={deviceWidth}
          height={deviceHeight}
          playing={this.state.playing}
          onEnded={() => this.setState({ playing: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    width: deviceWidth,
    height: deviceHeight,
    overflow: "hidden",
  },
});
