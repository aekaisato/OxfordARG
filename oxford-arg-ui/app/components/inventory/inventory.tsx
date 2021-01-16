import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ViewProperties,
  Button,
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
  Text,
} from "@ui-kitten/components";
import { TouchableHighlight } from "react-native-gesture-handler";
import { MuralClues } from "./mural-clues";
import { Notebook } from "./notebook";
import { playSound } from "../sound_system/sound_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let that;

let notebookEnabled = false;
export { notebookEnabled };

const muralClueTitle = "Mysterious Clues";
const muralClueDescription =
  "You found these every time you fixed ViriDOS and have no idea where they came from.";

const notebookTitle = "HOSHI Notebook";
const notebookDescription =
  "The notebook from the secret organization HOSHI. They want you to find all of the pages.";

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export declare interface InventoryProps extends ViewProperties {
  muralCluesEnabled?: boolean;
  notebookEnabled?: boolean;
}

export function enableMuralClues() {
  that.enableMuralClues();
}

export function enableNotebook() {
  that.enableNotebook();
  notebookEnabled = true;
}

export class Inventory extends React.Component<InventoryProps> {
  constructor(props: any) {
    super(props);
    let muralCluesEnabledTemp = props.muralCluesEnabled
      ? props.muralCluesEnabled
      : false;
    let notebookEnabledTemp = props.notebookEnabled
      ? props.notebookEnabled
      : false;
    this.state = {
      muralClueTitle: "Locked",
      muralClueDescription: "Keep playing to unlock.",
      muralClueDisabled: true,
      notebookTitle: "Locked",
      notebookDescription: "Keep playing to unlock.",
      notebookDisabled: true,
      displayMuralClues: "none",
      displayNotebook: "none",
    };
    if (muralCluesEnabledTemp) {
      this.enableMuralClues();
    }
    if (notebookEnabledTemp) {
      this.enableNotebook();
    }
    that = this;
  }

  enableMuralClues() {
    this.setState({
      muralClueTitle: muralClueTitle,
      muralClueDescription: muralClueDescription,
      muralClueDisabled: false,
    });
  }

  enableNotebook() {
    this.setState({
      notebookTitle: notebookTitle,
      notebookDescription: notebookDescription,
      notebookDisabled: false,
    });
  }

  handleToggleMuralClues() {
    playSound("button");
    let temp = this.state.displayMuralClues;
    if (temp == "none") {
      temp = "flex";
    } else {
      temp = "none";
    }
    this.setState({ displayMuralClues: temp });
  }

  handleToggleNotebook() {
    playSound("button");
    let temp = this.state.displayNotebook;
    if (temp == "none") {
      temp = "flex";
    } else {
      temp = "none";
    }
    this.setState({ displayNotebook: temp });
  }

  componentDidMount() {
    // this.enableMuralClues();
    // this.enableNotebook();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={{ fontFamily: "Noto-Sans", fontSize: deviceWidth / 100 }}>
          Inventory (Click outside this window to close it)
        </Text>
        <View
          style={{
            width: "100%",
            height: "90%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "48%",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 32,
                textAlign: "center",
              }}
            >
              {this.state.muralClueTitle}
            </Text>
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 100,
                textAlign: "center",
              }}
            >
              {this.state.muralClueDescription}
            </Text>
            <Button
              title="open"
              disabled={this.state.muralClueDisabled}
              onPress={() => this.handleToggleMuralClues()}
            />
          </View>
          <View
            style={{ width: 1, backgroundColor: "#FFFFFF80", height: "90%" }}
          ></View>
          <View
            style={{
              width: "50%",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "90%",
            }}
          >
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 32,
                textAlign: "center",
              }}
            >
              {this.state.notebookTitle}
            </Text>
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 100,
                textAlign: "center",
              }}
            >
              {this.state.notebookDescription}
            </Text>
            <Button
              title="open"
              disabled={this.state.notebookDisabled}
              onPress={() => this.handleToggleNotebook()}
            />
          </View>
        </View>
        <View
          style={{
            display: this.state.displayMuralClues,
            position: "absolute",
            height: deviceHeight,
            width: deviceWidth,
            backgroundColor: "#000000CC",
          }}
        >
          <MuralClues style={{ height: deviceHeight, width: deviceWidth }} />
          <View style={{ position: "absolute", top: 20, left: 20 }}>
            <Button
              title="close"
              onPress={() => this.handleToggleMuralClues()}
            />
          </View>
          <View style={{ position: "absolute", top: 20, alignSelf: "center" }}>
            <Text style={{ fontFamily: "Noto-Sans", alignSelf: "center" }}>
              drag and drop the images (a tad buggy, but deal with it)
            </Text>
          </View>
        </View>
        <View
          style={{
            display: this.state.displayNotebook,
            position: "absolute",
            height: deviceHeight,
            width: deviceWidth,
            backgroundColor: "#000000CC",
          }}
        >
          <Notebook style={{ height: deviceHeight, width: deviceWidth }} />
          <View style={{ position: "absolute", top: 20, left: 20 }}>
            <Button title="close" onPress={() => this.handleToggleNotebook()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
