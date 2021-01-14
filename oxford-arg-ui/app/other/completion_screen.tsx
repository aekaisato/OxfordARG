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

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let that: any;

document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

export function updateCompletionData(completionData: any) {
  if (that == undefined) {
    console.warn("completion screen that is undefined");
    return;
  }
  console.log("completion screen that IS defined :)");
  that.updateCompletionData(completionData);
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
              backgroundColor: "black",
              opacity: 0.6,
              borderRadius: 36,
              height: (5 * deviceHeight) / 6,
              minWidth: (2 * deviceWidth) / 3,
            }}
          ></View>
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
