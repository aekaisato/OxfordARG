import React from "react";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import { NavigationEvents } from "react-navigation";
import { getCurrentPhase } from "../components/navigation/navigation";
import { goto, increment } from "../components/status_system/status_system";

let completed = false;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let w = (5 * deviceWidth) / 9;
let h = (6 * deviceHeight) / 7;

let canvas: any;
let ctx: any;
let cols = Math.floor(w / 20) + 1;
let ypos = Array(cols).fill(0);

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function matrix() {
  // Draw a semitransparent black rectangle on top of previous drawing
  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  // Set color to green and font to 15pt monospace in the drawing context
  ctx.fillStyle = "#0f0";
  ctx.font = "15pt monospace";

  // for each column put a random character at the end
  ypos.forEach((y, ind) => {
    // generate a random character
    const text = String.fromCharCode(Math.random() * 128);

    // x coordinate of the column, y coordinate is already given
    const x = ind * 20;
    // render the character at (x, y)
    ctx.fillText(text, x, y);

    // randomly reset the end of the column if it's at least 100px high
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    // otherwise just move the y coordinate for the column 20px down,
    else ypos[ind] = y + 20;
  });
}

function initVisualizer(phase: any) {
  canvas = document.getElementById("matrixCanvas" + phase);
  console.log(canvas);
  ctx = canvas.getContext("2d");
  setInterval(matrix, 50);
}

function handleContinuePress() {
  if (completed) {
    return;
  }
  console.log("moving forward");
  completed = true;
  (async function () {
    await wait(1000);
    await goto(await increment());
  })();
}

export class ContinueConfirmation extends React.Component {
  state = {};

  componentDidMount() {
    let phase = getCurrentPhase();
    this.setState({ phase: phase }, () => initVisualizer(phase));
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            console.log("resetting continue button");
            completed = false;
          }}
        />
        <canvas height={h} width={w} id={"matrixCanvas" + this.state.phase} />
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            height: h,
            width: w,
          }}
        >
          <Button
            title="Ready to continue!"
            onPress={() => handleContinuePress()}
          />
        </View>
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
