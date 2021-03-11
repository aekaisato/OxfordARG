import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Phase3Window } from "./phase3_window";
import { ScrollView } from "react-native-gesture-handler";
import { CodeDisplay } from "../../components/layout_components/code_display/code_display";
import { ProgressBar } from "../../components/layout_components/progress_bar/progress_bar";
import { ProgressLeaderboard } from "../../components/layout_components/progress_leaderboard/progress_leaderboard";
import {
  PuzzleNavigator,
  setPuzzleNavigator,
} from "../../components/navigation/navigation";
import { images } from "../../components/inventory/notebook";
import { Inventory } from "../../components/inventory/inventory";
import {
  Transcript,
  VideoPlayer,
} from "../../components/video_player/video_player";
import { playSound } from "../../components/sound_system/sound_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

// document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

const notebookAsciiArt64 =
  "ICAgICAgICBfLi0iXAogICAgXy4tIiAgICAgXAogLC0iICAgICAgICAgIFwKKCBcICAgICAgICAgICAgXAogXCBcICAgICAgICAgICAgXAogIFwgXCAgICAgICAgICAgIFwKICAgXCBcICAgICAgICAgXy4tOwogICAgXCBcICAgIF8uLSIgICA6CiAgICAgXCBcLC0iICAgIF8uLSIKICAgICAgXCggICBfLi0iICAKICAgICAgIGAtLSI=";

const glitchImgArr = [
  require("../../../assets/glitch/glitch0.png"),
  require("../../../assets/glitch/glitch1.jpg"),
  require("../../../assets/glitch/glitch2.jpg"),
  require("../../../assets/glitch/glitch3.jpg"),
  require("../../../assets/glitch/glitch4.jpg"),
  require("../../../assets/glitch/glitch5.png"),
  require("../../../assets/glitch/glitch6.png"),
  require("../../../assets/glitch/glitch7.png"),
  require("../../../assets/glitch/glitch8.png"),
  require("../../../assets/glitch/glitch9.png"),
];

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

let that;

export function updatePagesCollected3() {
  if (that == undefined) {
    return;
  }
  that.updatePagesCollected();
}

export class Phase3Layout extends React.Component {
  updatePagesCollected() {
    this.setState({ pagesCollected: images.length });
  }

  handleToggleInventory() {
    let temp = this.state.inventoryDisplay;
    if (temp == "none") {
      temp = "flex";
    } else {
      temp = "none";
    }
    this.setState({ inventoryDisplay: temp });
  }

  state = {
    loopAnim: new Animated.Value(0),
    glitchImage: -1,
    inventoryDisplay: "none",
    pagesCollected: 0,
  };

  async glitchScreen() {
    while (true) {
      await wait(Math.floor(getRandomArbitrary(350, 1200)));
      let temp = Math.floor(getRandomArbitrary(0, 9));
      this.setState({ glitchImage: temp });
    }
  }

  componentDidMount() {
    this.glitchScreen();
    that = this;
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
            source={glitchImgArr[this.state.glitchImage]}
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
                  <Transcript
                    style={{
                      fontFamily: "VT323",
                      fontSize: 24,
                      color: "red",
                      margin: 6,
                      opacity: 1,
                    }}
                  />
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
                <VideoPlayer phase={3} />
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
              <PuzzleNavigator
                ref={(navigatorRef) => {
                  setPuzzleNavigator(navigatorRef);
                }}
              ></PuzzleNavigator>
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
                  <Button
                    title="Open"
                    color="red"
                    onPress={() => {
                      playSound("button");
                      this.handleToggleInventory();
                    }}
                  />
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
                  speed={480}
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
                dotColor="red"
              />
            </View>
          </Phase3Window>
        </View>
        <View
          /* @ts-ignore */
          style={{
            display: this.state.inventoryDisplay,
            position: "absolute",
            height: deviceHeight,
            width: deviceWidth,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback
            style={{
              height: deviceHeight,
              width: deviceWidth,
              justifyContent: "center",
              alignItems: "center",
              left: "100%",
              top: "100%",
            }}
            onPress={() => this.handleToggleInventory()}
          >
            <View style={{ height: deviceHeight, width: deviceWidth }} />
          </TouchableWithoutFeedback>
          <Inventory
            style={{
              height: deviceHeight / 2,
              width: deviceWidth / 2,
              borderRadius: deviceWidth / 100,
              backgroundColor: "#303030",
              position: "absolute",
              shadowRadius: 20,
            }}
          />
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
