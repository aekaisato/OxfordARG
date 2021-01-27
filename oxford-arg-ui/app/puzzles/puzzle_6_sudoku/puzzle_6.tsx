import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ImageBackground,
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
  Text,
} from "@ui-kitten/components";
//@ts-ignore
import { sudoku } from "./sudoku.js-master/sudoku";
import { TextInput } from "react-native-gesture-handler";
import { goto, increment } from "../../components/status_system/status_system";

let sv = require("sudoku-validator");

const instructions = `The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares.

The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.

The difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission. `;

const sudokuStr =
  "76294..53.34..67.9..85732.6327819.65851..4937649357..2..6432578275...394483795621";
const sudokuGrid = sudoku.board_string_to_grid(sudokuStr);
// const sudokuSolution = sudoku.solve(sudokuStr);
// const sudokuSolution2 =
//   "762941853534286719918573246327819465851624937649357182196432578275168394483795621";
// const solutionsIncomplete = ["1852811944621891168", "1852819144621819168", "8151281944268191681", "8151289144268119681"];


let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class Puzzle6 extends React.Component {
  // insert picture of wall in office

  state = {};

  pickBoxColor(y: number, x: number) {
    if (
      ((y <= 2 || y >= 6) && (x <= 2 || x >= 6)) ||
      (y >= 3 && y <= 5 && x >= 3 && x <= 5)
    ) {
      // yucky code ew get it away from me
      return "#CCCCCC";
    } else {
      return "#FFFFFF";
    }
  }

  pickTextColor(val: string) {
    if (val == ".") {
      return "blue";
    } else {
      return "#555555";
    }
  }

  isEditable(val: string) {
    return val == ".";
  }

  getValue(val: string, index1: number, index2: number) {
    let temp;
    let num = 9 * index1 + index2;
    if (val == ".") {
      temp = "";
    } else {
      temp = val;
    }
    if (this.state[num] == undefined) {
      this.setState({ [num]: temp });
    }
    return temp;
  }

  handleValue(val: string, index1: number, index2: number) {
    let num = 9 * index1 + index2;
    this.setState({ [num]: val });
  }

  async checkSudoku() {
    //while (true) {
    //@ts-ignore
    if (this.state["0"] != undefined) {
      let arr = [];
      for (let i = 0; i < 81; i++) {
        //@ts-ignore
        let val = this.state[i];
        if (val == "" || "0123456789".indexOf(val) == -1) {
          val = ".";
        } else {
          val = Number.parseInt(val);
        }
        arr.push(val);
      }
      let arr2 = arr.slice();
      let check = sv.isValid(arr2);
      console.log(arr);
      console.log(check);
      if (check) {
        this.setState({ outlineColor: "green" });
        console.log("sudoku solved, handle opening safe stuff");
        (async function(){
          await wait(2000);
          await goto(await increment());
        })();
        return;
      } else {
        alert("incorrect");
      }
    }
    await wait(1000);
    //}
  }

  componentDidMount() {
    this.setState({ outlineColor: "black" });
    this.checkSudoku();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/steel.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "75%",
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sudokuGrid.map((item: any, index: number) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  height: "11%",
                }}
              >
                {item.map((item2: any, index2: number) => (
                  <TextInput
                    style={{
                      backgroundColor: this.pickBoxColor(index, index2),
                      borderColor: this.state.outlineColor,
                      borderWidth: 2,
                      width: "11%",
                      height: "100%",
                      fontFamily: "VT323",
                      fontSize: 48,
                      textAlign: "center",
                      color: this.pickTextColor(item2),
                    }}
                    maxLength={1}
                    editable={this.isEditable(item2)}
                    defaultValue={this.getValue(item2, index, index2)}
                    value={this.state[9 * index + index2]}
                    onChangeText={(text) =>
                      this.handleValue(text, index, index2)
                    }
                  />
                ))}
              </View>
            ))}
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              width: "50%"
            }}
          >
            <Button onPress={() => alert(instructions)} title="instructions" />
            <Button onPress={() => this.checkSudoku()} title="check sudoku" />
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
