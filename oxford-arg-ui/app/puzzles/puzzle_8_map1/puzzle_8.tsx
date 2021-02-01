import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
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
    queuePlayer("Scene20Error1", true);
    freezeLength = 3222;
  } else if (count == 2) {
    queuePlayer("Scene20Error2", true);
    freezeLength = 3755;
  } else if (count >= 3) {
    queuePlayer("Scene20Error3", true);
    freezeLength = 8955;
  }
  freeze = true;
  await wait(freezeLength);
  freeze = false;
}

export class Puzzle8 extends React.Component {
  state = {
    incorrectCount: 0,
  };

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
              fontSize: deviceWidth / 24,
              textAlign: "center",
            }}
          >
            click on classroom 30B
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
              d="m 1305.2007,455.68513 83.5455,-0.30922 0.5214,76.65489 -84.0669,-1.13075 z"
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
