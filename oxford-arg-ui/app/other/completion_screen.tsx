import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
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
import { ScrollView } from "react-native-gesture-handler";
import { format, parseISO } from "date-fns";
import { data } from "jquery";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let that: any;

document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

export async function updateCompletionData(completionData: any) {
  while (that == undefined) {
    console.warn("completion screen that is undefined");
    await wait(2000);
  }
  console.log("completion screen that IS defined :)");
  let filteredData = {};
  for (let i in completionData) {
    if (completionData[i].completed != undefined) {
      filteredData = { ...filteredData, [i]: completionData[i] };
      console.log(filteredData);
    }
  }
  that.updateCompletionData(filteredData);
}

export class CompletionScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loopAnim: new Animated.Value(0),
      completionData: {},
    };
    that = this;
  }

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

  updateCompletionData(completionData: any) {
    this.setState({ completionData });
  }

  compareDate(a: string, b: string) {
    let aStr = this.state.completionData[a].completed;
    let bStr = this.state.completionData[b].completed;
    if (aStr > bStr) {
      return 1;
    } else if (aStr < bStr) {
      return -1;
    } else {
      return 0;
    }
  }

  handleTopBorder(index: number) {
    if (index == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  handleFontFamily(item: string) {
    let user = firebase.auth().currentUser;
    if (user == null) {
      return "Metropolis-Medium";
    } else if (user.uid == item) {
      return "Metropolis-Bold";
    } else {
      return "Metropolis-Medium";
    }
  }

  async handleName(item: string) {
    let database = firebase.database().ref("/users/" + item + "/name");
    let value = await (await database.once("value")).val();
    console.log(value);
    this.setState({ [item]: value });
  }

  handleNameMeta(item) {
    if (this.state[item] == undefined) {
      this.handleName(item);
    }
    return this.state[item];
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../layouts/phase1_layout/gradient only.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <ImageBackground
            source={require("../layouts/phase1_layout/grid only 2.png")}
            style={styles.imageBackgroundGrid}
            resizeMode="cover"
          >
            <Animated.View
              style={{ position: "absolute", right: this.state.loopAnim }}
            >
              <ImageBackground
                source={require("../layouts/phase1_layout/grid only 1.png")}
                style={styles.imageBackgroundGrid}
                resizeMode="cover"
              ></ImageBackground>
            </Animated.View>
          </ImageBackground>
        </ImageBackground>
        <View
          style={{
            height: deviceHeight,
            width: deviceWidth,
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: deviceHeight,
              width: (2 * deviceWidth) / 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#00000080",
                borderRadius: 36,
                height: (5 * deviceHeight) / 6,
                minWidth: (1 * deviceWidth) / 2,
                maxWidth: (2 * deviceWidth) / 3 - 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Bold",
                  fontSize: deviceHeight / 20,
                }}
              >
                Leaderboard
              </Text>
              <ScrollView
                style={{ height: "100%", width: "100%" }}
                contentContainerStyle={{
                  height: "100%",
                  width: "100%",
                  marginHorizontal: 20,
                }}
              >
                {Object.keys(this.state.completionData)
                  .sort((a, b) => this.compareDate(a, b))
                  .map((item, index) => {
                    return (
                      <View
                        style={{
                          width: "95%",
                          flexDirection: "row",
                          height: deviceHeight / 20,
                          borderColor: "#FFFFFFA0",
                          borderTopWidth: this.handleTopBorder(index),
                          borderBottomWidth: 1,
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                            }}
                          >
                            {index + 1}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 7,
                            height: "100%",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                              margin: deviceWidth / 100,
                            }}
                          >
                            {this.handleNameMeta(item)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 4,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                              margin: deviceWidth / 100,
                            }}
                          >
                            {format(
                              parseISO(
                                this.state.completionData[item].completed
                              ),
                              "p, PP"
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#00000080",
              height: deviceHeight,
              width: (1 * deviceWidth) / 3,
            }}
          >
            <Text
              style={{
                color: "white",
                margin: 20,
                fontFamily: "Metropolis-Bold",
                fontSize: deviceHeight / 24,
              }}
            >
              Credits
            </Text>
            <ScrollView
              style={{ height: "100%", width: "100%" }}
              contentContainerStyle={{
                height: "100%",
                width: "100%",
                marginHorizontal: 20,
              }}
            ></ScrollView>
          </View>
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

const creditsString = `hello
this is


a test

of the credits`;
