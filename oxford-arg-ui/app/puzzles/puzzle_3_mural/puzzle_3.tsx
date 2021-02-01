import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import $ from "jquery";
import Mural from "../../../assets/mural/rosaparks-mural-interactive.svg";
import { goto, increment } from "../../components/status_system/status_system";

function checkForGreen() {
  //@ts-ignore
  let muralImage = $.find("#mural-image");
  if (
    muralImage.length == 0 ||
    muralImage[0].contentDocument == undefined ||
    muralImage[0].contentDocument == null
  ) {
    return false;
  }
  let pathStyle;
  try {
    pathStyle = muralImage[0].contentDocument.documentElement.children.namedItem(
      "path1185"
    ).attributes.style.nodeValue;
    console.log(pathStyle);
  } catch (e) {
    console.warn(e);
    console.log(muralImage);
    return;
  }

  pathStyle = pathStyle.replace(/ /g, "");
  console.log(pathStyle);
  var result = {},
    attributes = pathStyle.split(";");

  for (var i = 0; i < attributes.length; i++) {
    var entry = attributes[i].split(":");
    //@ts-ignore
    result[entry.splice(0, 1)[0]] = entry.join(":");
  }
  //@ts-ignore
  let opacity = result.opacity;
  console.log(opacity);

  if (opacity == 1) {
    return true;
  } else {
    return false;
  }
}

async function loopGreenCheck() {
  while (true) {
    await wait(2000);
    console.log("loop");
    let isGreen = checkForGreen();
    console.log(isGreen);
    if (isGreen) {
      console.log("puzzle complete, make sure to do stuff here");
      (async function () {
        await wait(2000);
        await goto(await increment());
      })();
      return;
    }
  }
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export class Puzzle3 extends React.Component {
  componentDidMount() {
    loopGreenCheck();
  }

  render() {
    return (
      <View style={styles.container}>
        <object
          type="image/svg+xml"
          data={Mural}
          height="100%"
          id="mural-image"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
