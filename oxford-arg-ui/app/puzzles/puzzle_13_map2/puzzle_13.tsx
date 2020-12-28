import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  ImageBackground,
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
import { goto, increment } from "../../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const mapping = {
  name: "my-map",
  areas: [
    {
      name: "303",
      shape: "poly",
      coords: [980, 400, 980, 455, 1040, 455, 1040, 400],
      preFillColor: "#FF0000",
      fillColor: "#000000",
    },
  ],
};

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function correctLink() {
  console.warn("add stuff here for the correct stuff");
  (async function () {
    await wait(2000);
    await goto(await increment());
  })();
}

async function incorrectLink() {
  alert("incorrect"); // replace alert with video rant
  console.warn("add stuff here for the incorrect stuff");
}

export class Puzzle13 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/map_1.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "VT323",
              color: "white",
              fontSize: deviceWidth / 36,
              textAlign: "center",
            }}
          >
            click on classroom G+1, Z+5, F-3 (C)
          </Text>
          <svg
            viewBox="0 0 1656 1250.6667"
            preserveAspectRatio="none"
            style={{ width: deviceWidth / 2, height: (3 * deviceWidth) / 8 }}
          >
            <image
              width={1656}
              height={1250.6667}
              preserveAspectRatio="none"
              href={require("../../../assets/img/oa_map.jpg")}
              id="image_map_8"
              onClick={() => incorrectLink()}
            />
            <path
              style={{
                opacity: 0,
                fill: "#000000",
                stroke: "#000000",
                strokeWidth: 5,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              d="m 324.47368,97.079727 1.09324,88.771103 24.48858,-0.21865 0.4373,46.13474 84.61679,1.09324 -1.31189,-135.780433 z"
              id="path14"
              onClick={() => correctLink()}
            />
          </svg>
        </ImageBackground>
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
