import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { goto, increment } from "../../components/status_system/status_system";

let completed = false;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

window.addEventListener("message", function (e) {
  const data = e.data;
  if (data == "puzzle completed") {
    if (completed) {
      return;
    }
    completed = true;
    (async function () {
      await wait(2000);
      await goto(await increment());
    })();
  }
});

export class Puzzle11 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <iframe
          style={{ height: "100%", width: "100%" }}
          src="/static/pong/index.html"
          frameBorder="0"
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
  },
});
