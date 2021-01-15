import React from "react";
import { StyleSheet, View, Dimensions, ViewProperties } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  NavigationEvents,
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
import firebase from "firebase";
import "firebase/auth";
import { LeaderboardDot } from "./leaderboard_dot";
import { Shake } from "reshake";
import _ from "lodash";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let statusData = {};
let libraryLength = -1;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function setLibraryLength(length: number) {
  libraryLength = length;
}

export declare interface LeaderboardProps extends ViewProperties {
  color?: string;
}

export async function updateLeaderboardData(statusData: any) {
  let user = firebase.auth().currentUser;
  let statusDataIn;
  if (statusData == null) {
    statusDataIn = {};
  } else {
    statusDataIn = await _.cloneDeep(statusData);
  }
  if (user != null) {
    //console.warn("uncomment this line");
    delete statusDataIn[user.uid];
  }
  statusData = statusDataIn;
}

export class ProgressLeaderboard extends React.Component<LeaderboardProps> {
  color: string;
  // add firebase stuff here
  constructor(props: Readonly<LeaderboardProps>) {
    super(props);
    this.state = {
      libraryLength: -1,
      statusData: {},
    };
    if (props.color == undefined) {
      this.color = "black";
    } else {
      this.color = props.color;
    }
  }

  async updateState() {
    while (true) {
      this.setState({ statusData: statusData, libraryLength: libraryLength });
      await wait(5000);
    }
  }

  componentDidMount() {
    this.updateState();
  }

  getDotLocation(data: any) {
    let status = data.status;
    let percentage = (status / this.state.libraryLength) * 100;
    console.log(percentage);
    return percentage + "%";
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            borderColor: this.color,
            borderLeftWidth: 3,
            borderRightWidth: 3,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={[
            this.props.style,
            {
              borderColor: this.color,
              borderWidth: 1.5,
              position: "absolute",
              left: -3,
              height: 0,
            },
          ]}
        />
        {Object.keys(this.state.statusData).map((item: any) => (
          <Shake
            h={5}
            v={5}
            r={0}
            dur={1000}
            int={12.5}
            max={100}
            fixed={true}
            fixedStop={false}
            freez={false}
            style={{
              position: "absolute",
              left: this.getDotLocation(this.state.statusData[item]),
            }}
          >
            <LeaderboardDot />
          </Shake>
        ))}
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
