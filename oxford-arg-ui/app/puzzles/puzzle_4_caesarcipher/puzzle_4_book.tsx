import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
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
import { Cipher } from "js-cipher";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const cipher = new Cipher();
const originalText =
  "Friends, Romans, Countrymen, lend me your ears: This teacher's guide has been taken over by HOSHI™. If you're looking for what we've created, the password to the safe in the cabinet is eight-three-five-nine. If you're not on the quest, then completely ignore what we just said. And if you're from Whitney, leave. Thank you!";
const cipherText = cipher.encrypt(originalText, 3);
const cT1 = cipherText.substring(0, cipherText.length / 2);
const cT2 = cipherText.substring(cipherText.length / 2);
console.log(cipherText);

export class Puzzle4Book extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/puzzle_4-1.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../../assets/img/blank-book.png")}
            style={{
              height: "95%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                height: "60%",
              }}
            >
              <Text
                style={{
                  width: "33%",
                  height: "80%",
                  fontFamily: "EB-Garamond",
                  fontSize: 36,
                }}
              >
                {cT1}
              </Text>
              <Text
                style={{
                  width: "33%",
                  height: "80%",
                  fontFamily: "EB-Garamond",
                  fontSize: 36,
                }}
              >
                {cT2}
              </Text>
            </View>
            <Image
              source={require("../../../assets/img/caesar-cipher-guide.svg")}
              style={{ height: "15%" }}
              resizeMode="contain"
            />
          </ImageBackground>
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
