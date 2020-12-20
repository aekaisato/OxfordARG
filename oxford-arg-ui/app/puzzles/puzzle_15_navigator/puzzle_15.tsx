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
  ScrollView,
  TouchableHighlightBase,
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
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";
import { borderTopWidth } from "html2canvas/dist/types/css/property-descriptors/border-width";
import update from "react-addons-update";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const mapStr =
  "0000011000010010110010112010101310001010111100101001011011110000";
const mapArr = mapStr.split("");
let map2d: string[][] = [];
while (mapArr.length) {
  map2d.push(mapArr.splice(0, 8));
}
console.log(map2d);

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle15 extends React.Component {
  // please remember that the array is stored as row, col; not x, y
  // add blurred background of classroom

  state = {
    xPos: 0,
    yPos: 3,
    direction: "right",
    map: JSON.parse(JSON.stringify(map2d)),
    queue: [],
  };

  async clockwise() {
    if (this.state.direction == "right") {
      this.setState({ direction: "down" });
    } else if (this.state.direction == "down") {
      this.setState({ direction: "left" });
    } else if (this.state.direction == "left") {
      this.setState({ direction: "up" });
    } else if (this.state.direction == "up") {
      this.setState({ direction: "right" });
    } else {
      console.warn("smth wrong with rotate function");
    }
  }

  async counterClockwise() {
    if (this.state.direction == "right") {
      this.setState({ direction: "up" });
    } else if (this.state.direction == "up") {
      this.setState({ direction: "left" });
    } else if (this.state.direction == "left") {
      this.setState({ direction: "down" });
    } else if (this.state.direction == "down") {
      this.setState({ direction: "right" });
    } else {
      console.warn("smth wrong with rotate function");
    }
  }

  displayCharacter(chr: string) {
    if (chr == "3") {
      return "\u2611";
    } else if (chr == "2") {
      if (this.state.direction == "right") {
        return "\u21d2";
      } else if (this.state.direction == "up") {
        return "\u21d1";
      } else if (this.state.direction == "left") {
        return "\u21d0";
      } else if (this.state.direction == "down") {
        return "\u21d3";
      } else {
        console.warn("smth wrong with displaying character: " + chr);
      }
    } else if (chr == "1") {
      return "\u2715";
    } else if (chr == "0") {
      return "";
    } else {
      console.warn("smth wrong with displaying character: " + chr);
    }
  }

  async moveForward() {
    let dX = 0;
    let dY = 0;
    if (this.state.direction == "right") {
      dX += 1;
    } else if (this.state.direction == "up") {
      dY -= 1;
    } else if (this.state.direction == "left") {
      dX -= 1;
    } else if (this.state.direction == "down") {
      dY += 1;
    } else {
      console.warn("smth wrong with parsing direction when moving");
    }

    if (
      this.state.xPos + dX > 7 ||
      this.state.xPos + dX < 0 ||
      this.state.yPos + dY > 7 ||
      this.state.yPos + dY < 0
    ) {
      return;
    }

    if (
      this.state.map[this.state.yPos + dY][this.state.xPos + dX] == 0 ||
      this.state.map[this.state.yPos + dY][this.state.xPos + dX] == 3
    ) {
      if (this.state.map[this.state.yPos + dY][this.state.xPos + dX] == 3) {
        console.log("do smth here, puzzle completed");
      }

      this.setState(
        update(this.state, {
          map: {
            [this.state.yPos + 0]: {
              [this.state.xPos + 0]: {
                $set: "0",
              },
            },
          },
        }),
        () => {
          this.setState(
            update(this.state, {
              map: {
                [this.state.yPos + dY]: {
                  [this.state.xPos + dX]: {
                    $set: "2",
                  },
                },
              },
            }),
            () => {
              this.setState({
                xPos: this.state.xPos + dX,
                yPos: this.state.yPos + dY,
              });
            }
          );
        }
      );
    }
  }

  addToQueue(input: number) {
    // 0 for forward, 1 for clockwise, 2 for counterclockwise
    if (this.state.queue.length < 40) {
      this.setState({ queue: [...this.state.queue, input] });
    }
  }

  backspaceQueue() {
    if (this.state.queue.length > 0) {
      this.setState({ queue: this.state.queue.slice(0, -1) });
    }
  }

  displayQueue(value: number) {
    if (value == 0) {
      return "\u25bb";
    } else if (value == 1) {
      return "\u21b7";
    } else if (value == 2) {
      return "\u21b6";
    } else {
      console.warn("issue with displaying queue: " + value);
      return " ";
    }
  }

  async processQueue() {
    for (let i = 0; i < this.state.queue.length; i++) {
      let value = this.state.queue[i];
      if (value == 0) {
        await this.moveForward();
      } else if (value == 1) {
        await this.clockwise();
      } else if (value == 2) {
        await this.counterClockwise();
      } else {
      }
      await wait(500);
    }
    if (!(this.state.xPos == 7 && this.state.yPos == 3)) {
      await wait(500);
      alert("incorrect. try again.");
      this.resetBoard();
    }
  }

  resetBoard() {
    this.setState({ map: map2d, xPos: 0, yPos: 3, direction: "right" });
  }

  render() {
    return (
      <View style={styles.container}>
        <table
          style={{
            width: (3 * deviceHeight) / 5,
            height: (3 * deviceHeight) / 5,
            textAlign: "center",
          }}
          border={3}
        >
          <tbody
            style={{
              fontFamily: "Noto-Sans-Bold",
              fontSize: 32,
              color: "white",
            }}
          >
            <tr>
              <td>{this.displayCharacter(this.state.map[0][0])}</td>
              <td>{this.displayCharacter(this.state.map[0][1])}</td>
              <td>{this.displayCharacter(this.state.map[0][2])}</td>
              <td>{this.displayCharacter(this.state.map[0][3])}</td>
              <td>{this.displayCharacter(this.state.map[0][4])}</td>
              <td>{this.displayCharacter(this.state.map[0][5])}</td>
              <td>{this.displayCharacter(this.state.map[0][6])}</td>
              <td>{this.displayCharacter(this.state.map[0][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[1][0])}</td>
              <td>{this.displayCharacter(this.state.map[1][1])}</td>
              <td>{this.displayCharacter(this.state.map[1][2])}</td>
              <td>{this.displayCharacter(this.state.map[1][3])}</td>
              <td>{this.displayCharacter(this.state.map[1][4])}</td>
              <td>{this.displayCharacter(this.state.map[1][5])}</td>
              <td>{this.displayCharacter(this.state.map[1][6])}</td>
              <td>{this.displayCharacter(this.state.map[1][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[2][0])}</td>
              <td>{this.displayCharacter(this.state.map[2][1])}</td>
              <td>{this.displayCharacter(this.state.map[2][2])}</td>
              <td>{this.displayCharacter(this.state.map[2][3])}</td>
              <td>{this.displayCharacter(this.state.map[2][4])}</td>
              <td>{this.displayCharacter(this.state.map[2][5])}</td>
              <td>{this.displayCharacter(this.state.map[2][6])}</td>
              <td>{this.displayCharacter(this.state.map[2][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[3][0])}</td>
              <td>{this.displayCharacter(this.state.map[3][1])}</td>
              <td>{this.displayCharacter(this.state.map[3][2])}</td>
              <td>{this.displayCharacter(this.state.map[3][3])}</td>
              <td>{this.displayCharacter(this.state.map[3][4])}</td>
              <td>{this.displayCharacter(this.state.map[3][5])}</td>
              <td>{this.displayCharacter(this.state.map[3][6])}</td>
              <td>{this.displayCharacter(this.state.map[3][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[4][0])}</td>
              <td>{this.displayCharacter(this.state.map[4][1])}</td>
              <td>{this.displayCharacter(this.state.map[4][2])}</td>
              <td>{this.displayCharacter(this.state.map[4][3])}</td>
              <td>{this.displayCharacter(this.state.map[4][4])}</td>
              <td>{this.displayCharacter(this.state.map[4][5])}</td>
              <td>{this.displayCharacter(this.state.map[4][6])}</td>
              <td>{this.displayCharacter(this.state.map[4][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[5][0])}</td>
              <td>{this.displayCharacter(this.state.map[5][1])}</td>
              <td>{this.displayCharacter(this.state.map[5][2])}</td>
              <td>{this.displayCharacter(this.state.map[5][3])}</td>
              <td>{this.displayCharacter(this.state.map[5][4])}</td>
              <td>{this.displayCharacter(this.state.map[5][5])}</td>
              <td>{this.displayCharacter(this.state.map[5][6])}</td>
              <td>{this.displayCharacter(this.state.map[5][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[6][0])}</td>
              <td>{this.displayCharacter(this.state.map[6][1])}</td>
              <td>{this.displayCharacter(this.state.map[6][2])}</td>
              <td>{this.displayCharacter(this.state.map[6][3])}</td>
              <td>{this.displayCharacter(this.state.map[6][4])}</td>
              <td>{this.displayCharacter(this.state.map[6][5])}</td>
              <td>{this.displayCharacter(this.state.map[6][6])}</td>
              <td>{this.displayCharacter(this.state.map[6][7])}</td>
            </tr>
            <tr>
              <td>{this.displayCharacter(this.state.map[7][0])}</td>
              <td>{this.displayCharacter(this.state.map[7][1])}</td>
              <td>{this.displayCharacter(this.state.map[7][2])}</td>
              <td>{this.displayCharacter(this.state.map[7][3])}</td>
              <td>{this.displayCharacter(this.state.map[7][4])}</td>
              <td>{this.displayCharacter(this.state.map[7][5])}</td>
              <td>{this.displayCharacter(this.state.map[7][6])}</td>
              <td>{this.displayCharacter(this.state.map[7][7])}</td>
            </tr>
          </tbody>
        </table>
        <ScrollView
          style={{
            width: deviceWidth / 2,
            height: deviceHeight / 15,
          }}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}
          horizontal={true}
        >
          <Text style={{ color: "white", marginRight: 20 }}>
            {"Queue (" + this.state.queue.length + "/40):"}
          </Text>
          <table
            style={{
              height: deviceHeight / 16,
              textAlign: "center",
            }}
            border={3}
          >
            <tbody
              style={{
                fontFamily: "Noto-Sans-Bold",
                fontSize: 32,
                color: "white",
              }}
            >
              <tr>
                {this.state.queue.map((item) => (
                  <td>{this.displayQueue(item)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            title="backspace"
            onPress={() => this.backspaceQueue()}
          ></Button>
          <Button title="counterclockwise" onPress={() => this.addToQueue(2)}></Button>
          <Button title="forward" onPress={() => this.addToQueue(0)}></Button>
          <Button title="clockwise" onPress={() => this.addToQueue(1)}></Button>
          <Button title="play" onPress={() => this.processQueue()}></Button>
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
