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

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle7 extends React.Component {
  // add blurred background of classroom

  componentDidMount() {}

  state = {
    textInput: "",
    borderColor: "#000000"
  };

  onTextChange(text) {
    this.setState({ textInput: text });
  }

  onSubmit() {
    const correctHash = "e7e94d9ef1edaf2c6c55e9966b551295";
    let currStr = this.state.textInput;
    let checkHash = md5(currStr.toLowerCase()).toString();
    if (checkHash == correctHash) {
      this.setState({borderColor: "#00FF00"});
      console.log("do smth here because the puzzle is now solved");
      (async function () {
        await wait(2000);
        await goto(await increment());
      })();
    } else {
      alert("password incorrect");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/puzzle_7.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/img/ptable.png")}
            style={{ height: "60%", width: "100%" }}
            resizeMode="contain"
          />
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
                backgroundColor: "white",
                borderWidth: 2,
                borderRadius: 5,
                fontFamily: "VT323",
                fontSize: 48,
                textAlign: "center",
                marginRight: 15,
                borderColor: this.state.borderColor
              }}
              autoFocus={true}
              secureTextEntry={true}
              value={this.state.textInput}
              onChangeText={(value) => this.onTextChange(value)}
              onKeyPress={(event) => {
                if (event.nativeEvent.key == "Enter") {
                  this.onSubmit();
                }
              }}
            />
            <Button title="Submit" onPress={() => this.onSubmit()} />
          </View>
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
