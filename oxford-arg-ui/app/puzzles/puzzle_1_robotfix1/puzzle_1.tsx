import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Text,
  Button,
} from "react-native";

let deviceWidth = Dimensions.get("window").width;

import html from "./flow-free-master/flow.html";

export class Puzzle1 extends React.Component {
  state: { infoOverlay: "flex" | "none" } = {
    infoOverlay: "flex",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[styles.container, { alignItems: "center" }]}
          source={require("../../../assets/backdrops/puzzle_1.jpg")}
        >
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ boxShadow: "0px 0px 20px" }}
          ></div>
        </ImageBackground>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000A0",
            display: this.state.infoOverlay,
          }}
        >
          <Image
            source={require("../../../assets/img/flow-instructions.webp")}
            style={{
              width: "88.8vh",
              height: "50vh",
              borderColor: "white",
              borderWidth: 5,
            }}
            resizeMode="contain"
          />
          <View style={{ height: 25 }} />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Noto-Sans",
                fontSize: deviceWidth / 64,
                color: "white",
              }}
            >
              Click and drag.
            </Text>
            <View style={{ width: 25 }} />
            <View>
              <Button
                title="Understood."
                onPress={() => this.setState({ infoOverlay: "none" })}
              />
            </View>
          </View>
        </View>
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
