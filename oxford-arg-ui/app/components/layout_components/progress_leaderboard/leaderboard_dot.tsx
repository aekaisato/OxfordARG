import React from "react";
import { StyleSheet, View, Dimensions, ViewProperties } from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

interface LeaderboardDotProps extends ViewProperties {
  color?: string;
}

export class LeaderboardDot extends React.Component<LeaderboardDotProps> {
  color: string;
  constructor(props: Readonly<LeaderboardDotProps>) {
    super(props);
    if (props.color == undefined) {
      this.color = "white";
    } else {
      this.color = props.color;
    }
  }

  render() {
    return (
      <View
        style={[
          {
            backgroundColor: this.color,
            opacity: 0.33,
            width: deviceHeight / 100,
            height: deviceHeight / 100,
            borderRadius: deviceHeight / 200,
          },
          this.props.style,
        ]}
      ></View>
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
