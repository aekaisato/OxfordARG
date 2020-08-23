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
import { Phase1Window } from "./phase1_window";
import { ScrollView } from "react-native-gesture-handler";
import { Audio, Video } from "expo-av";
import { CodeDisplay } from "../../components/layout_components/code_display/code_display";
import { ProgressBar } from "../../components/layout_components/progress_bar/progress_bar";
import { ProgressLeaderboard } from "../../components/layout_components/progress_leaderboard/progress_leaderboard";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

export class Phase1Layout extends React.Component {
  state = {
    loopAnim: new Animated.Value(0),
    pagesCollected: 0,
    transcript:
      "this is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdthis is a test\n\ntestetfsrhgedzs\n\nlorem ipsum\n\n\nnesgsfgsthf\ngsdfhgsxdd",
  };

  move = () => {
    Animated.loop(
      Animated.timing(this.state.loopAnim, {
        toValue: (128 * (deviceWidth * 1.75)) / 3840,
        duration: 2500,
        easing: Easing.inOut(Easing.linear),
      })
    ).start();
  };

  componentDidMount() {
    this.move();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./gradient only.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <ImageBackground
            source={require("./grid only 2.png")}
            style={styles.imageBackgroundGrid}
            resizeMode="cover"
          >
            <Animated.View
              style={{ position: "absolute", right: this.state.loopAnim }}
            >
              <ImageBackground
                source={require("./grid only 1.png")}
                style={styles.imageBackgroundGrid}
                resizeMode="cover"
              ></ImageBackground>
            </Animated.View>
          </ImageBackground>
        </ImageBackground>
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
              <Phase1Window
                windowName="Transcript"
                style={{
                  height: (9 * deviceHeight) / 14,
                  width: 0.2 * 0.9 * deviceWidth,
                }}
              >
                <ScrollView
                  style={{
                    backgroundColor: "#00000070",
                    width: 0.2 * 0.9 * deviceWidth - 7,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Courier-Prime",
                      fontSize: 14,
                      color: "white",
                      margin: 6,
                      opacity: 1,
                    }}
                  >
                    {this.state.transcript}
                  </Text>
                </ScrollView>
              </Phase1Window>
              <Phase1Window
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
                    height: (3 * deviceHeight) / 14 - 28,
                    width: 0.2 * 0.9 * deviceWidth - 8,
                  }}
                />
              </Phase1Window>
            </View>
          </View>
          <View
            style={{
              height: (6 * deviceHeight) / 7,
              width: (5 * deviceWidth) / 9,
              alignItems: "center",
            }}
          >
            <Phase1Window
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
                  height: (6 * deviceHeight) / 7 - 28,
                  width: (5 * deviceWidth) / 9 - 8,
                }}
              />
            </Phase1Window>
          </View>
          <View
            style={{
              height: (6 * deviceHeight) / 7,
              width: (2 * deviceWidth) / 9,
              alignItems: "center",
            }}
          >
            <Phase1Window
              windowName="Inventory"
              style={{
                height: (3 * deviceHeight) / 14,
                width: 0.2 * 0.9 * deviceWidth,
                margin: 18,
              }}
            >
              <View
                style={{
                  backgroundColor: "#00000070",
                  width: 0.2 * 0.9 * deviceWidth - 8,
                  height: (3 * deviceHeight) / 14 - 28,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../../assets/img/notebook.png")}
                    style={{
                      height: deviceHeight / 8,
                      width: deviceHeight / 8,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "Courier-Prime-Bold",
                      fontSize: 28,
                      color: "white",
                      margin: 6,
                      opacity: 1,
                    }}
                  >
                    {this.state.pagesCollected + " pages collected"}
                  </Text>
                </View>
                <View style={{ width: deviceWidth / 16 }}>
                  <Button title="Open Inventory" />
                </View>
              </View>
            </Phase1Window>
            <View style={{ shadowOpacity: 0.35, shadowRadius: 20 }}>
              <Phase1Window>
                <View
                  style={{
                    backgroundColor: "#00000070",
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
                  />
                </View>
              </Phase1Window>
              <Phase1Window>
                <View
                  style={{
                    backgroundColor: "#00000070",
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
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontFamily: "Courier-Prime-Bold",
                      fontSize: 28,
                      color: "white",
                      margin: 6,
                      opacity: 1,
                      textAlign: "center",
                    }}
                  >
                    {"SYSTEMS\nCLEAR"}
                  </Text>
                </View>
              </Phase1Window>
            </View>
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
          <Phase1Window
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
                backgroundColor: "#303030",
                width: deviceWidth - 36,
                height: deviceHeight / 16,
                alignItems: "center",
              }}
            >
              <ProgressBar
                color="#FFFFFF"
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
              />
            </View>
          </Phase1Window>
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
