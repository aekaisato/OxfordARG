import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { goto, increment } from "../../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let completed = false;

let map: boolean[][] = [];

for (let i = 0; i < 3; i++) {
  let tempArr = [];
  for (let j = 0; j < 3; j++) {
    let tempVal = false;
    if (Math.random() < 0.3) {
      tempVal = true;
    }
    tempArr.push(tempVal);
    //tempArr.push(false);
  }
  map.push(tempArr);
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle12 extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      map: map,
      complete: false,
    };
  }

  setTitle(item: boolean) {
    if (item) {
      return "on";
    } else {
      return "off";
    }
  }

  setColor(item: boolean) {
    if (!item) {
      return "#4d0000";
    } else {
      return "#00d400";
    }
  }

  setFont(item: boolean) {
    if (item) {
      return "Courier-Prime-Bold";
    } else {
      return "Courier-Prime-Italic";
    }
  }

  toggle(row: any, col: any) {
    if (this.state.complete) {
      return;
    }
    let tempArr = this.state.map;
    tempArr[row][col] = !tempArr[row][col];
    if (tempArr[row + 1] != undefined) {
      tempArr[row + 1][col] = !tempArr[row + 1][col];
    }
    if (tempArr[row - 1] != undefined) {
      tempArr[row - 1][col] = !tempArr[row - 1][col];
    }
    if (tempArr[row][col + 1] != undefined) {
      tempArr[row][col + 1] = !tempArr[row][col + 1];
    }
    if (tempArr[row][col - 1] != undefined) {
      tempArr[row][col - 1] = !tempArr[row][col - 1];
    }
    this.setState({ map: tempArr });
    this.checkCompletion();
  }

  checkCompletion() {
    let tempArr = this.state.map;
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr[i].length; j++) {
        if (!tempArr[i][j]) {
          return;
        }
      }
    }
    if (completed) {
      return;
    }
    completed = true;
    this.setState({ complete: true });
    (async function () {
      await wait(2000);
      await goto(await increment());
    })();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/steel2.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: (2 * deviceHeight) / 3,
              height: (2 * deviceHeight) / 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.map.map((row: any, indexR: any) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {row.map((item: any, indexC: any) => (
                  <View
                    style={{
                      margin: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.toggle(indexR, indexC)}
                    >
                      <View
                        style={{
                          width: deviceHeight / 6,
                          height: deviceHeight / 6,
                          backgroundColor: this.setColor(item),
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: deviceHeight / 100,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: deviceHeight / 22,
                            fontFamily: this.setFont(item),
                          }}
                        >
                          {this.setTitle(item)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
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
    justifyContent: "center",
  },
});
