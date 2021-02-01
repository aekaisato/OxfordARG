import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
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
import { TextInput } from "react-native-gesture-handler";
import md5 from "crypto-js/md5";
import { goto, increment } from "../../components/status_system/status_system";
import { queuePlayer } from "../../components/video_player/video_player";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export class Puzzle16 extends React.Component {
  // add blurred background of classroom

  componentDidMount() {}

  state = {
    textInput: "",
  };

  onTextChange(text) {
    this.setState({ textInput: text });
  }

  onSubmit() {
    const hash1 = "7dbf02f9a04cb9fe2d4a220d0e99d872";
    const hash1Alt = "3db0e01f42f51905a6772529919099fa";
    const hash2 = "59249c4410f9f8b9ddb61000a38d13c6";
    let hash1Solved = false;
    let hash2Solved = false;
    let currStr = this.state.textInput;
    let strArr = currStr.toLowerCase().split(" ");
    for (let i = 0; i < strArr.length; i++) {
      if (
        md5(strArr[i]).toString() == hash1 ||
        md5(strArr[i]).toString() == hash1Alt
      ) {
        hash1Solved = true;
      } else if (md5(strArr[i]).toString() == hash2) {
        hash2Solved = true;
      }
    }
    if (hash1Solved && hash2Solved) {
      (async function () {
        await wait(1000);
        await goto(await increment());
      })();
    } else {
      console.log("incorrect");
      let rand = Math.floor(getRandomArbitrary(0, 3)) + 1;
      if (rand > 3) {
        // shouldn't be necessary
        rand = 3;
      } else if (rand < 1) {
        rand = 1;
      }
      let key = "Scene28Error" + rand;
      console.log(key);
      queuePlayer(key, true);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "VT323",
              color: "#00FF00",
              fontSize: deviceWidth / 24,
              textAlign: "center",
            }}
          >
            Please enter where you would like to navigate.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TextInput
              style={{
                width: "50%",
                height: "80%",
                backgroundColor: "black",
                borderWidth: 2,
                borderRadius: 5,
                fontFamily: "VT323",
                fontSize: 48,
                textAlign: "center",
                marginRight: 15,
                borderColor: "#00FF00",
                color: "#00FF00",
              }}
              autoFocus={true}
              value={this.state.textInput}
              onChangeText={(value) => this.onTextChange(value)}
              onKeyPress={(event) => {
                if (event.nativeEvent.key == "Enter") {
                  this.onSubmit();
                }
              }}
            />
            <Button
              title="Submit"
              onPress={() => this.onSubmit()}
              color="#00FF00"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
