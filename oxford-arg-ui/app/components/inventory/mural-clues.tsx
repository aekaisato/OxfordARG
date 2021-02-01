import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ViewProperties,
  Text,
} from "react-native";
import Draggable from "react-native-draggable";
import { enableMuralClues } from "./inventory";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let that: any;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function getMural1Unlocked() {
  return that.state.mural1Unlocked;
}

export function getMural2Unlocked() {
  return that.state.mural2Unlocked;
}

export function setUnlocked(num: number, is: boolean) {
  that.setUnlocked(num, is);
}

export declare interface MuralClueProps extends ViewProperties {}

export class MuralClues extends React.Component<MuralClueProps> {
  dragImg: HTMLImageElement | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      mural1Unlocked: false,
      mural2Unlocked: false,
    };
    that = this;
  }

  setUnlocked(num: number, is: boolean) {
    if (num != 1 && num != 2) {
      return;
    } else if (num == 1) {
      this.setState({ mural1Unlocked: is });
      if (is) {
        enableMuralClues();
      }
    } else if (num == 2) {
      this.setState({ mural2Unlocked: is });
      if (is) {
        enableMuralClues();
      }
    }
  }

  componentDidMount() {
    this.dragImg = new Image(0, 0);
    this.dragImg.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }

  handleOnDragStart = (e: any) => {
    e.dataTransfer.setDragImage(this.dragImg, 0, 0);
  };

  render() {
    let clue1;
    let clue2;
    if (this.state.mural1Unlocked) {
      clue1 = (
        <Draggable x={500} y={150} renderSize={deviceWidth / 2}>
          <View style={{ flex: 1 }}>
            <img
              src={require("../../../assets/mural/rosaparks-mural-xonly.png")}
              style={{
                width: deviceWidth / 2,
                height: deviceWidth / 2,
                objectFit: "contain",
              }}
              onDragStart={(e) => this.handleOnDragStart(e)}
            />
          </View>
        </Draggable>
      );
    } else {
      clue1 = <View />;
    }
    if (this.state.mural2Unlocked) {
      clue2 = (
        <Draggable x={50} y={50} renderSize={deviceWidth / 2}>
          <View style={{ flex: 1 }}>
            <img
              src={require("../../../assets/mural/rosaparks-mural-outlineonly.png")}
              style={{
                width: deviceWidth / 2,
                height: deviceWidth / 2,
                objectFit: "contain",
              }}
              onDragStart={(e) => this.handleOnDragStart(e)}
            />
          </View>
        </Draggable>
      );
    } else {
      clue2 = <View />;
    }
    return (
      <View style={[styles.container, this.props.style]}>
        {clue1}
        {clue2}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
