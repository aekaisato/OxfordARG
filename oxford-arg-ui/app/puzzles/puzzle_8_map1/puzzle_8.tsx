import React from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
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
import { goto, increment } from "../../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function continueTemp() {
  (async function(){
    await wait(2000);
    await goto(await increment());
  })();
}

export class Puzzle8 extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text>
          puzzle 8: press button to continue (temp)
        </Text>
        <Button title="continue" onPress={() => continueTemp()}/>
      </Layout>
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
