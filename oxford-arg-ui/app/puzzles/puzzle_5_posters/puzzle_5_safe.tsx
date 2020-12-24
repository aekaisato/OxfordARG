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
import { goto, increment } from "../../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle5Safe extends React.Component {
  //POLO

  state = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    outlineColor: "#FF443A",
  };

  handleOnChangeText(ref: string, val: string) {
    if (this.state.outlineColor == "green") {
      return;
    }
    if (val.length <= 1) {
      this.setState({ [ref]: val });
    }
  }

  handleKeyPress(
    ref: string,
    key: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) {
    if (this.state.outlineColor == "green") {
      return;
    }
    let refsList = ["first", "second", "third", "fourth"];
    let nextRef = "";
    let index = refsList.indexOf(ref);
    if (key.nativeEvent.key != "Backspace") {
      if (index == refsList.length - 1) {
        nextRef = refsList[0];
      } else {
        nextRef = refsList[index + 1];
      }
      //@ts-ignore
      this.refs[nextRef].focus();
    } else {
      //this.handleOnChangeText(ref, "") //this.state[ref].substring(0, this.state[ref].length-2)
      if (index == 0) {
        nextRef = refsList[refsList.length - 1];
      } else {
        nextRef = refsList[index - 1];
      }
      //@ts-ignore

      //@ts-ignore
      this.refs[nextRef].focus();
    }
  }

  async checkCode() {
    while (true) {
      console.log(
        "checking: " +
          this.state.first +
          this.state.second +
          this.state.third +
          this.state.fourth
      );
      if (
        this.state.first.toLowerCase() == "n" &&
        this.state.second.toLowerCase() == "i" &&
        this.state.third.toLowerCase() == "c" &&
        this.state.fourth.toLowerCase() == "e"
      ) {
        this.setState({ outlineColor: "green" });
        console.log(
          "code correct, this should be handled by the flags system or whatever"
        );
        (async function(){
          await wait(2000);
          await goto(await increment());
        })();
        return;
      } else {
        await wait(1000);
      }
    }
  }

  componentDidMount() {
    this.checkCode();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/img/lock1.png")}
          style={{
            height: "95%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
          resizeMode="contain"
        >
          <View style={{ width: "28%" }} />
          <TextInput
            ref="first"
            style={{
              width: "5%",
              height: "10%",
              backgroundColor: "white",
              borderColor: this.state.outlineColor,
              borderWidth: 2,
              borderRadius: 5,
              fontFamily: "VT323",
              fontSize: 48,
              textAlign: "center",
              marginTop: "20%",
            }}
            maxLength={1}
            onChangeText={(val) => this.handleOnChangeText("first", val)}
            onKeyPress={(key) => this.handleKeyPress("first", key)}
            value={this.state.first}
            autoFocus={true}
          />
          <TextInput
            ref="second"
            style={{
              width: "5%",
              height: "10%",
              backgroundColor: "white",
              borderColor: this.state.outlineColor,
              borderWidth: 2,
              borderRadius: 5,
              fontFamily: "VT323",
              fontSize: 48,
              textAlign: "center",
              marginTop: "20%",
            }}
            maxLength={1}
            onChangeText={(val) => this.handleOnChangeText("second", val)}
            onKeyPress={(key) => this.handleKeyPress("second", key)}
            value={this.state.second}
          />
          <TextInput
            ref="third"
            style={{
              width: "5%",
              height: "10%",
              backgroundColor: "white",
              borderColor: this.state.outlineColor,
              borderWidth: 2,
              borderRadius: 5,
              fontFamily: "VT323",
              fontSize: 48,
              textAlign: "center",
              marginTop: "20%",
            }}
            maxLength={1}
            onChangeText={(val) => this.handleOnChangeText("third", val)}
            onKeyPress={(key) => this.handleKeyPress("third", key)}
            value={this.state.third}
          />
          <TextInput
            ref="fourth"
            style={{
              width: "5%",
              height: "10%",
              backgroundColor: "white",
              borderColor: this.state.outlineColor,
              borderWidth: 2,
              borderRadius: 5,
              fontFamily: "VT323",
              fontSize: 48,
              textAlign: "center",
              marginTop: "20%",
            }}
            maxLength={1}
            onChangeText={(val) => this.handleOnChangeText("fourth", val)}
            onKeyPress={(key) => this.handleKeyPress("fourth", key)}
            value={this.state.fourth}
          />
          <View style={{ width: "28%" }} />
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
