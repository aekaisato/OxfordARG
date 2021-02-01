import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import { goto, increment } from "../../components/status_system/status_system";
import { queuePlayer } from "../../components/video_player/video_player";

let deviceWidth = Dimensions.get("window").width;

let freeze = false;
let complete = false;
let count = 0;


async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function correctLink() {
  if (freeze || complete) {
    return;
  }
  complete = true;
  (async function () {
    await wait(2000);
    await goto(await increment());
  })();
}

async function incorrectLink() {
  if (freeze || complete) {
    return;
  }
  count++;
  let freezeLength = 0;
  if (count == 1) {
    queuePlayer("Scene25Error1", true);
    freezeLength = 4022;
  } else if (count == 2) {
    queuePlayer("Scene25Error2", true);
    freezeLength = 2255;
  } else if (count >= 3) {
    queuePlayer("Scene25Error3", true);
    freezeLength = 9255;
  }
  freeze = true;
  await wait(freezeLength);
  freeze = false;
}

export class Puzzle13 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/map_2.jpg")}
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
