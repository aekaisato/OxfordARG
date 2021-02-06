import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { goto, increment } from "../../components/status_system/status_system";
import md5 from "crypto-js/md5";

let completed = false;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle4Safe extends React.Component {
  //8359

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
    console.log(ref);
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
      this.setState({ [ref]: "" });
      //@ts-ignore
      this.refs[nextRef].focus();
    } else {
      //this.handleOnChangeText(ref, "") //this.state[ref].substring(0, this.state[ref].length-2)
      if (this.state[ref].length >= 1) {
        this.setState({ [ref]: "" });
        return;
      }
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
      if (completed) {
        return;
      }
      let str =
        this.state.first +
        this.state.second +
        this.state.third +
        this.state.fourth;
      console.log("checking: " + str);
      if (md5(str).toString() == "3db54f5573cd617a0112d35dd1e6b1ef") {
        completed = true;
        this.setState({ outlineColor: "green" });
        console.log(
          "code correct, this should be handled by the flags system or whatever"
        );
        (async function () {
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
          source={require("../../../assets/backdrops/puzzle_4-2.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                color: "black",
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
                color: "black",
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
                color: "black",
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
                color: "black",
              }}
              maxLength={1}
              onChangeText={(val) => this.handleOnChangeText("fourth", val)}
              onKeyPress={(key) => this.handleKeyPress("fourth", key)}
              value={this.state.fourth}
            />
            <View style={{ width: "28%" }} />
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
