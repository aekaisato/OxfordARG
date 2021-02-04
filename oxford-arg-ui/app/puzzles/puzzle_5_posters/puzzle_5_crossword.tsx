import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class Puzzle5Crossword extends React.Component {
  // insert picture of wall in office
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/puzzle_5-1.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../../assets/img/poster.png")}
            style={{ height: "100%", width: "32%" }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../assets/img/crossword.png")}
            style={{ height: "100%", width: "65%" }}
            resizeMode="contain"
          />
        </ImageBackground>
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
