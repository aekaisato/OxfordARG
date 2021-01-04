import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
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
import { XTerm } from "xterm-for-react";
import { images } from "../components/inventory/notebook";
import {
  continueGame,
  startGame,
} from "../components/status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const PRIMARY_PROMPT_STRING = "[remote@viridos-system]$ ";

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class MainMenu extends React.Component {
  ref = (xtermRef: any) => {
    this.xtermRef = xtermRef;
  };
  xtermRef: any;

  constructor(props) {
    super(props);
    this.state = {
      inited: false,
      input: "",
      doingSmth: false,
      str: "",
    };
  }

  async initTerm() {
    await wait(800);
    this.xtermRef.terminal.write("ViriDOS Remote Operating System");
    await wait(20);
    this.xtermRef.terminal.writeln(" - Version 0.7.2");
    await wait(350);
    this.xtermRef.terminal.writeln(new Date().toString() + "\n");
    await wait(920);
    this.xtermRef.terminal.writeln(
      "Please sign up or login before beginning the game."
    );
    await wait(3);
    this.xtermRef.terminal.writeln(
      `Available commands are "signup", "login", "start", and "continue".`
    );
    await wait(5);
    this.xtermRef.terminal.writeln(
      "Type in a command (without quotes), then press the ENTER key to run it.\n"
    );
    await wait(1200);
    this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);

    this.setState({ inited: true });
  }

  async readData(data: string) {
    if (!this.state.inited) {
      return;
    }
    const code = data.charCodeAt(0);
    const buffer = await this.xtermRef.terminal.buffer._buffers._activeBuffer.x;
    let str = PRIMARY_PROMPT_STRING;
    if (this.state.doingSmth) {
      str = this.state.str;
    }
    let index = buffer - str.length;
    if (code === 13) {
      if (this.state.doingSmth) {
      } else {
        if (this.state.input.trim().length == 0) {
          this.xtermRef.terminal.writeln("");
          this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
          return;
        }
        this.xtermRef.terminal.writeln("");
        const input = this.state.input.trim();
        if (input == "signup") {
          await this.signUp();
          return;
        } else if (input == "login") {
          await this.login();
          return;
        } else if (input == "start") {
          await this.start();
          return;
        } else if (input == "continue") {
          await this.continue();
          return;
        } else if (input == "help") {
          this.xtermRef.terminal.writeln(
            `Available commands are "signup", "login", "start", and "continue".`
          );
        } else {
          this.xtermRef.terminal.writeln(
            `"` + input + `"` + " is not a valid command."
          );
          this.xtermRef.terminal.writeln(
            `Available commands are "signup", "login", "start", and "continue".`
          );
        }
        this.xtermRef.terminal.writeln("");
        this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
        this.setState({ input: "" });
      }
    } else if (code == 127) {
      if (this.state.input.length > 0) {
        this.setState({
          input:
            this.state.input.substring(0, index - 1) +
            this.state.input.substring(index),
        });
        if (buffer > str.length) {
          this.xtermRef.terminal.write("\b \b");
        }
      }
    } else if (code == 3) {
      this.xtermRef.terminal.writeln("^C");
      this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
      this.setState({ input: "", doingSmth: false });
      return;
    } else if (code < 32) {
      /*
    else if (code == 27 && !data.includes("A") && !data.includes("B")) {
      if (data.includes("D")) {
        if (buffer > str.length) {
          this.xtermRef.terminal.write(data);
        }
      }
      if (data.includes("C")) {
        if (buffer < str.length + this.state.input.length) {
          this.xtermRef.terminal.write(data);
        }
      }
      //*/
    } else {
      this.xtermRef.terminal.write(data);
      this.setState({ input: this.state.input.substring(0, index) + data });
    }
    console.log(this.state.input);
  }

  async signUp() {
    const str1 = "Enter your email: ";
    this.setState({ doingSmth: true, str: str1 });
    this.xtermRef.terminal.write(str1);
    console.warn("somehow wait for input")
  }

  async login() {
    this.setState({ doingSmth: true });
  }

  async start() {
    startGame();
  }

  async continue() {
    continueGame();
  }

  componentDidMount() {
    this.initTerm();
  }

  render() {
    return (
      <View style={styles.container}>
        <XTerm
          ref={this.ref}
          options={{ cursorBlink: true }}
          onData={(data) => this.readData(data)}
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
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "black",
  },
});
