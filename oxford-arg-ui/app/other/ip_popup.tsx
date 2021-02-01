import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  Easing,
} from "react-native";

let that: any;

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function fetchIP() {
  // find better api
  console.log("fetching ip");
  let fetched = await fetch(
    "https://api.ipgeolocation.io/ipgeo?apiKey=f3fdd2df07074288a58408cd2bf58f7e"
  ).catch(async () => {
    console.log("first api didn't work, trying diff api");
    return await fetch("https://ipwhois.app/json/");
  });
  let obj = await fetched.json();
  console.log(obj);
  let ip;
  let city;
  let state;
  ip = obj.ip;
  city = obj.city;
  state = obj.country;
  if (obj.country_name != undefined) {
    state = obj.country_name;
  }

  let output = {
    ip,
    city,
    state,
  };

  return output;
}

export async function triggerIPEffect() {
  await setIP();
  that.toggleVisibility();
  await wait(4000);
  that.toggleVisibility();
}

async function setIP() {
  let obj = await fetchIP();
  that.setIP(obj.ip, obj.city, obj.state);
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class IPPopup extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      ip: "",
      city: "",
      state: "",
      visible: "none",
      textColor: new Animated.Value(0),
    };
    that = this;
  }

  setIP(ip: string, city: string, state: string) {
    this.setState({ ip, city, state });
  }

  toggleVisibility() {
    console.log("toggling visibility of ip");
    if (this.state.visible == "none") {
      this.setState({ visible: "flex" });
    } else if (this.state.visible == "flex") {
      this.setState({ visible: "none" });
    } else {
      console.warn(
        "you done goofed -- tried to toggle visibility of ip address trick"
      );
    }
  }

  animateColor() {
    Animated.loop(
      Animated.timing(this.state.textColor, {
        toValue: 255,
        duration: 800,
        easing: Easing.inOut(Easing.quad),
      })
    ).start();
  }

  componentDidMount() {
    this.animateColor();
  }

  render() {
    let textColor = this.state.textColor.interpolate({
      inputRange: [0, 255],
      outputRange: ["#760000", "#FF0000"],
    });
    let osd;
    if (this.state.ip != undefined) {
      osd = (
        <>
          <Animated.Text
            style={{
              color: textColor,
              fontFamily: "VT323",
              fontSize: deviceWidth / 14,
              textShadowRadius: 20,
              textShadowColor: "black",
            }}
          >
            {"IP Address: " + this.state.ip}
          </Animated.Text>
          <Animated.Text
            style={{
              color: textColor,
              fontFamily: "VT323",
              fontSize: deviceWidth / 14,
            }}
          >
            {"Location: " + this.state.city + ", " + this.state.state}
          </Animated.Text>
        </>
      );
    } else {
      osd = <></>;
    }
    return (
      <View
        style={[
          styles.container,
          {
            display: this.state.visible,
            position: "absolute",
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: "#000000AB",
          },
        ]}
      >
        {osd}
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
