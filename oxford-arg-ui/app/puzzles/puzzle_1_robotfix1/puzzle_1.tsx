import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";

// import {goto, increment} from "../../components/status_system/status_system"

import html from "./flow-free-master/flow.html";


export class Puzzle1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.container, {alignItems: "center"}]}
          source={require("../../../assets/backdrops/puzzle_1.jpg")}
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
