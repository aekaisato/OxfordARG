import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";

import html from "./tower-of-hanoi-master/index.html";

export class Puzzle2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.container, {alignItems: "center"}]}
          source={require("../../../assets/backdrops/puzzle_2.jpg")}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} style={{boxShadow: "0px 0px 20px"}}></div>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    overflow: "hidden",
  },
});
