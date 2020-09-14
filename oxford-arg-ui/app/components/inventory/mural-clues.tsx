import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ViewProperties,
  Text,
  Image as ImageRN,
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
import Draggable from "react-native-draggable";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export declare interface MuralClueProps extends ViewProperties {}

export class MuralClues extends React.Component<MuralClueProps> {
  dragImg: HTMLImageElement | undefined;
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.dragImg = new Image(0,0);
    this.dragImg.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  handleOnDragStart = (e: any) => {
    e.dataTransfer.setDragImage(this.dragImg, 0, 0);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Draggable x={50} y={50} renderSize={deviceWidth / 2}>
          <View style={{ flex: 1 }}>
            <img
              src={require("../../../assets/mural/rosaparks-mural-outlineonly.png")}
              style={{ width: deviceWidth / 2, height: deviceWidth / 2, objectFit: "contain" }}
              onDragStart={(e) => this.handleOnDragStart(e)}
            />
          </View>
        </Draggable>
        <Draggable x={500} y={150} renderSize={deviceWidth / 2}>
          <View style={{ flex: 1 }}>
            <img
              src={require("../../../assets/mural/rosaparks-mural-xonly.png")}
              style={{ width: deviceWidth / 2, height: deviceWidth / 2, objectFit: "contain" }}
              onDragStart={(e) => this.handleOnDragStart(e)}
            />
          </View>
        </Draggable>
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
