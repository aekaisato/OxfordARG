import firebase from "firebase/app";
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
import { NavigationEvents } from "react-navigation";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let that: any;

// document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

// https://codepen.io/ConnorsFan/pen/rzeXNe

let fps = 60;
let speedFactor = 0.0025;
let minDelta = 0.5;
let autoScrollSpeed = 10;
let autoScrollTimer: NodeJS.Timeout, restartTimer: NodeJS.Timeout;
let isScrolling = false;
let prevPos = 0,
  currentPos: number | undefined = 0;
let currentTime, prevTime: number | null, timeDiff;

async function initAutoScrollCredits() {
  while (document.getElementById("creditsView") == null) {
    await wait(1000);
  }
  document
    .getElementById("creditsView")
    ?.addEventListener("scroll", function (e) {
      currentPos = document.getElementById("creditsView")?.scrollTop;
    });
  document
    .getElementById("creditsView")
    ?.addEventListener("wheel", handleManualScroll);
  document
    .getElementById("creditsView")
    ?.addEventListener("touchmove", handleManualScroll);
  setAutoScroll(20);
}

function handleManualScroll() {
  currentPos = document.getElementById("creditsView")?.scrollTop;
  clearInterval(autoScrollTimer);
  if (restartTimer) {
    clearTimeout(restartTimer);
  }
  restartTimer = setTimeout(() => {
    prevTime = null;
    setAutoScroll();
  }, 250);
}

function setAutoScroll(newValue?: number | undefined) {
  if (newValue) {
    autoScrollSpeed = speedFactor * newValue;
  }
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
  }
  autoScrollTimer = setInterval(function () {
    currentTime = Date.now();
    if (prevTime) {
      if (!isScrolling) {
        timeDiff = currentTime - prevTime;
        currentPos += autoScrollSpeed * timeDiff;
        if (Math.abs(currentPos - prevPos) >= minDelta) {
          isScrolling = true;
          document.getElementById("creditsView")?.scrollTo(0, currentPos);
          isScrolling = false;
          prevPos = currentPos;
          prevTime = currentTime;
        }
      }
    } else {
      prevTime = currentTime;
    }
  }, 1000 / fps);
}

function setCreditsScrollToTop() {
  prevPos = 0;
  currentPos = 0;
  document.getElementById("creditsView")?.scrollTo(0, 0);
}

export async function updateCompletionData(completionData: any) {
  while (that == undefined) {
    await wait(2000);
  }
  console.log("completion screen that IS defined :)");
  let filteredData = {};
  for (let i in completionData) {
    if (completionData[i].completed != undefined) {
      filteredData = { ...filteredData, [i]: completionData[i] };
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
    initAutoScrollCredits();
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
    // console.log(value);
    this.setState({ [item]: value });
  }

  handleNameMeta(item: string) {
    const PLACEHOLDER_STR = "Loading...";

    if (this.state[item] == undefined) {
      this.handleName(item);
      this.setState({ [item]: PLACEHOLDER_STR });
    }
    let temp = this.state[item];
    if (temp == undefined) {
      temp = PLACEHOLDER_STR;
    }
    return temp;
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => setCreditsScrollToTop()} />
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
                        key={item}
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
              overflow: "hidden",
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
            <div
              style={{
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                alignItems: "center",
                textAlign: "center",
                paddingRight:
                  document.getElementById("creditsView")?.offsetWidth -
                    document.getElementById("creditsView")?.offsetWidth || 17,
                boxSizing: "content-box",
              }}
              id="creditsView"
            >
              <View style={{ height: deviceHeight }} />
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Regular",
                  fontSize: deviceHeight / 54,
                  textAlign: "center",
                }}
              >
                {creditsString}
              </Text>
              <View style={{ height: deviceHeight / 2 }} />
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Regular",
                  fontSize: deviceHeight / 54,
                  textAlign: "center",
                }}
              >
                Thanks for playing!
              </Text>
              <View style={{ height: deviceHeight / 2 }} />
            </div>
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

const creditsString = `VIRIDOS - An Oxford ARG


Created by 
Aiden Sato and Brandon Imai

Story by
Aiden Sato and Brandon Imai

Written by
Aiden Sato and Brandon Imai

Executive Producer
Oxford PTSA

Producer
Brandon Imai

Cinematographer
Aiden Sato

Script Coordinator
Brandon Imai

Head of Programming
Aiden Sato

Video Editor
Brandon Imai

Special Effects Coordinator
Aiden Sato

Puzzle Team
Cory Spessert, Joshua Spessert, Lance Sahagun, Aiden Sato, and Brandon Imai


CAST (in order of appearance)

MR. ALONSO
Himself

VIRIDOS TUTORIAL VOICE
Brandon Imai

VIRIDOS
Salli Text to Speech Voice

HOSHI REPRESENTATIVE
Aiden Sato

MS. FONG
Herself

MR. HERNANDEZ
Himself

MS. WORTHINGTON
Herself

MS. TRAN
Herself

MS. STEPHAN
Herself

MR. KIM’S CLASS PRESIDENT
Michael Nguyen

MS. SIGGSON
Herself

MS. JENSEN
Herself

MR. VASQUEZ
Himself

WHITNEY REPRESENTATIVE
Kimberly Hosoda

MR. HOGAN
Himself

MR. WEI
Himself


Music By
Ryan Imai, Sebastian Aguilan, and Aiden Sato

“Zero G”
by Ryan Imai and Sebastian Aguilan

“Safe_Mode”
by Aiden Sato

“Kali”
by Aiden Sato


Playtesters
The Sato Family, The Imai Family, Justin Lin, Lance Sahagun, and Connor Takeshita

Marketing Team
Lance Sahagun, Brandon Imai, Aiden Sato


Sound Effects from
FreeSound and Storyblocks

Additional Images from
Pexels


The creators of this game would like to personally thank PTSA and the OA administration for allowing us to create this project and the custodians who work tirelessly to keep our campus in a clean and safe condition.

The creators would also like to thank everyone involved in the development of this game, including the teachers for generously donating their time to film footage for us as well as our good friend Kimberly Hosoda from Whitney High School.
`;
