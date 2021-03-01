import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ViewProperties,
  Text,
  Image,
  Button
} from "react-native";
import Draggable from "react-draggable";
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
  if(that == undefined) {
    "mural that not defined"
    return;
  }
  return that.state.mural1Unlocked;
}

export function getMural2Unlocked() {
  if(that == undefined) {
    "mural that not defined"
    return;
  }
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
      infoOverlay: "flex"
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

  render() {
    let clue1;
    let clue2;
    if (this.state.mural1Unlocked) {
      clue1 = (
        <Draggable>
          <div>
            <img
              src={require("../../../assets/mural/rosaparks-mural-xonly.png")}
              style={{
                width: (2 * deviceWidth) / 5,
                objectFit: "contain",
              }}
              draggable="false"
            />
          </div>
        </Draggable>
      );
    } else {
      clue1 = <View />;
    }
    if (this.state.mural2Unlocked) {
      clue2 = (
        <Draggable>
          <div>
            <img
              src={require("../../../assets/mural/rosaparks-mural-outlineonly.png")}
              style={{
                width: (2 * deviceWidth) / 5,
                objectFit: "contain",
              }}
              draggable="false"
            />
          </div>
        </Draggable>
      );
    } else {
      clue2 = <View />;
    }
    return (
      <View style={[styles.container, this.props.style]}>
        {clue1}
        {clue2}
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000A0",
            display: this.state.infoOverlay,
          }}
        >
          <Image
            source={require("../../../assets/img/clue-instructions.webp")}
            style={{
              width: "88.8vh",
              height: "50vh",
              borderColor: "white",
              borderWidth: 5,
            }}
            resizeMode="contain"
          />
          <View style={{ height: 25 }} />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 64,
                color: "white",
              }}
            >
              Drag and drop the images.
            </Text>
            <View style={{ width: 25 }} />
            <View>
              <Button
                title="Understood."
                onPress={() => this.setState({ infoOverlay: "none" })}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
