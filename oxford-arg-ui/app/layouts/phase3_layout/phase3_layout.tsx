import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  Text,
  Image,
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
} from "@ui-kitten/components";
import { Phase3Window } from "./phase3_window";
import { ScrollView } from "react-native-gesture-handler";
import { Audio, Video } from "expo-av";
import { CodeDisplay } from "../../components/layout_components/code_display/code_display";
import { ProgressBar } from "../../components/layout_components/progress_bar/progress_bar";
import { ProgressLeaderboard } from "../../components/layout_components/progress_leaderboard/progress_leaderboard";
import html2canvas from "html2canvas";
//@ts-ignore
import * as glitch from "glitch-canvas";
//@ts-ignore
//import stylesCSS from "./phase3_glitch.scss";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

const notebookAsciiArt64 =
  "ICAgICAgICBfLi0iXAogICAgXy4tIiAgICAgXAogLC0iICAgICAgICAgIFwKKCBcICAgICAgICAgICAgXAogXCBcICAgICAgICAgICAgXAogIFwgXCAgICAgICAgICAgIFwKICAgXCBcICAgICAgICAgXy4tOwogICAgXCBcICAgIF8uLSIgICA6CiAgICAgXCBcLC0iICAgIF8uLSIKICAgICAgXCggICBfLi0iICAKICAgICAgIGAtLSI=";

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export class Phase3Layout extends React.Component {
  state = {
    loopAnim: new Animated.Value(0),
    glitchImage: "",
    pagesCollected: 0,
    transcript:
      "this is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdd",
  };

  async glitchScreen() {
    while (true) {
      let canvasTemp = await html2canvas(document.body);
      let ctx = await canvasTemp.getContext("2d");
      if (ctx == null) {
        return;
      }
      let imageData = await ctx.getImageData(0, 0, deviceWidth, deviceHeight);
      let image = await glitch({ amount: 8, iterations: 20 })
        .fromImageData(imageData)
        .toDataURL();
      await wait(getRandomArbitrary(350, 1200));
      await this.setState({ glitchImage: image });
    }
  }

  componentDidMount() {
    this.glitchScreen();
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          //@ts-ignore
          style={{
            height: deviceHeight,
            width: deviceWidth,
            position: "absolute",
            display: "flex",
          }}
        >
          <Image
            source={{ uri: this.state.glitchImage }}
            style={{ height: deviceHeight, width: deviceWidth }}
          />
        </View>
        <View
          style={{
            height: (6 * deviceHeight) / 7,
            width: deviceWidth,
            flexDirection: "row",
            position: "absolute",
          }}
        >
          <View
            style={{
              height: (6 * deviceHeight) / 7,
              width: (2 * deviceWidth) / 9,
              alignItems: "center",
            }}
          >
            <View style={{ margin: 18 }}>
              <Phase3Window
                windowName="Transcript"
                style={{
                  height: (9 * deviceHeight) / 14,
                  width: 0.2 * 0.9 * deviceWidth,
                }}
              >
                <ScrollView
                  style={{
                    backgroundColor: "#000000C8",
                    width: 0.2 * 0.9 * deviceWidth - 7,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "VT323",
                      fontSize: 18,
                      color: "red",
                      margin: 6,
                      opacity: 1,
                    }}
                  >
                    {this.state.transcript}
                  </Text>
                </ScrollView>
              </Phase3Window>
              <Phase3Window
                windowName="Communicator"
                style={{
                  height: (3 * deviceHeight) / 14,
                  width: 0.2 * 0.9 * deviceWidth,
                  top: -4,
                }}
              >
                <Image
                  source={{ uri: "https://i.vgy.me/utjbVt.jpg" }}
                  style={{
                    height: (3 * deviceHeight) / 14 - 8,
                    width: 0.2 * 0.9 * deviceWidth - 8,
                  }}
                />
              </Phase3Window>
            </View>
          </View>
          <View
            style={{
              height: (6 * deviceHeight) / 7,
              width: (5 * deviceWidth) / 9,
              alignItems: "center",
            }}
          >
            <Phase3Window
              windowName="Live Feed"
              style={{
                height: (6 * deviceHeight) / 7,
                width: (5 * deviceWidth) / 9,
                top: -4,
                margin: 18,
              }}
            >
              <Image
                source={{ uri: "https://i.vgy.me/wZOs7c.jpg" }}
                style={{
                  height: (6 * deviceHeight) / 7 - 8,
                  width: (5 * deviceWidth) / 9 - 8,
                }}
              />
            </Phase3Window>
          </View>
          <View
            style={{
              height: (6 * deviceHeight) / 7,
              width: (2 * deviceWidth) / 9,
              alignItems: "center",
            }}
          >
            <Phase3Window
              windowName="Inventory"
              style={{
                height: (3 * deviceHeight) / 14,
                width: 0.2 * 0.9 * deviceWidth,
                margin: 18,
              }}
            >
              <View
                style={{
                  backgroundColor: "#000000C8",
                  width: 0.2 * 0.9 * deviceWidth - 8,
                  height: (3 * deviceHeight) / 14 - 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "VT323",
                      fontSize: 10,
                      color: "red",
                      width: 0.1 * 0.9 * deviceWidth - 8,
                      marginLeft: 24,
                      marginTop: 8,
                    }}
                  >
                    {window.atob(notebookAsciiArt64)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "VT323",
                      fontSize: 28,
                      color: "red",
                      margin: 6,
                      opacity: 1,
                    }}
                  >
                    {this.state.pagesCollected + " pages collected"}
                  </Text>
                </View>
                <View style={{ width: deviceWidth / 16 }}>
                  <Button title="Open Inventory" color="red" />
                </View>
              </View>
            </Phase3Window>
            <Phase3Window>
              <View
                style={{
                  backgroundColor: "#000000C8",
                  height: (5 * deviceHeight) / 14 - 8 - 9,
                  width: 0.2 * 0.9 * deviceWidth - 8,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <CodeDisplay
                  style={{
                    height: (5 * deviceHeight) / 14 - 8 - 9,
                    width: 0.2 * 0.9 * deviceWidth - 8,
                    justifyContent: "center",
                  }}
                  color="red"
                  font="VT323"
                  speed={675}
                />
              </View>
            </Phase3Window>
            <Phase3Window>
              <View
                style={{
                  backgroundColor: "#000000C8",
                  height: (4 * deviceHeight) / 14 - 8 - 9,
                  width: 0.2 * 0.9 * deviceWidth - 8,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/img/robot-white.png")}
                  style={{
                    height: deviceHeight / 6,
                    width: deviceHeight / 6,
                    tintColor: "red",
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: "VT323",
                    fontSize: 28,
                    color: "red",
                    margin: 6,
                    opacity: 1,
                    textAlign: "center",
                  }}
                >
                  {"SYSTEM\nFAILURE"}
                </Text>
              </View>
            </Phase3Window>
          </View>
        </View>
        <View
          style={{
            height: (1 * deviceHeight) / 7 - 14,
            width: deviceWidth,
            flexDirection: "row",
            position: "absolute",
            top: (6 * deviceHeight) / 7 + 14,
          }}
        >
          <Phase3Window
            windowName="Progress"
            style={{
              margin: 18,
              width: deviceWidth - 36,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: deviceWidth - 44,
                height: deviceHeight / 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000000C8",
              }}
            >
              <ProgressBar
                color="red"
                value={69}
                style={{
                  height: deviceHeight / 36,
                  width: deviceWidth - 48,
                  borderRadius: (deviceWidth - 48) / 4,
                }}
              />
              <ProgressLeaderboard
                style={{
                  height: deviceHeight / 36,
                  width: deviceWidth - 48,
                }}
                color="red"
              />
            </View>
          </Phase3Window>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    overflow: "hidden",
    backgroundColor: "black",
  },
  imageBackground: {
    height: deviceHeight,
    width: deviceWidth,
  },
  imageBackgroundGrid: {
    height: deviceHeight * 1.75,
    width: deviceWidth * 1.75,
  },
});
