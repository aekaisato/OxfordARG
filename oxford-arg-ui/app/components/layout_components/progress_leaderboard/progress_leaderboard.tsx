import React from "react";
import { StyleSheet, View, Dimensions, ViewProperties } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { LeaderboardDot } from "./leaderboard_dot";
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
  dotColor?: string;
}

export async function updateLeaderboardData(statusDataP: any) {
  let user = firebase.auth().currentUser;
  let statusDataIn;
  if (statusDataP == null) {
    statusDataIn = {};
  } else {
    statusDataIn = await _.cloneDeep(statusDataP);
  }
  if (user != null) {
    delete statusDataIn[user.uid];
  }
  statusData = statusDataIn;
}

export class ProgressLeaderboard extends React.Component<LeaderboardProps> {
  color: string;
  dotColor: string;
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
    if (props.dotColor == undefined) {
      this.dotColor = "white";
    } else {
      this.dotColor = props.dotColor;
    }
  }

  async updateState() {
    while (true) {
      this.setState({ statusData: statusData, libraryLength: libraryLength });
      await wait(30000);
    }
  }

  componentDidMount() {
    this.updateState();
  }

  getDotLocation(data: any) {
    let status = data.status;
    let percentage = (status / this.state.libraryLength) * 100;
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
              backgroundColor: this.color,
            },
          ]}
        />
        {Object.keys(this.state.statusData).map((item: any) => (
          <LeaderboardDot
            style={{
              position: "absolute",
              left: this.getDotLocation(this.state.statusData[item]),
            }}
            color={this.dotColor}
          />
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
