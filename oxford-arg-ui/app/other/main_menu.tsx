import React from "react";
import { StyleSheet, View, Dimensions, AsyncStorage } from "react-native";
import {
  NavigationEvents,
} from "react-navigation";
import { XTerm } from "xterm-for-react";
import {
  continueGame,
  startGame,
} from "../components/status_system/status_system";
import {
  createAccount,
  isLoggedIn,
  loginUser,
  logoutUser,
} from "../components/cloud_sync/cloud_sync";
import {
  navigatePhase,
  navigatePuzzle,
} from "../components/navigation/navigation";
var bcrypt = require("bcryptjs");

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const PRIMARY_PROMPT_STRING = "[remote@viridos-system]$ ";
const AVAILABLE_COMMAND_STRING = `Available commands are "signup", "login", "logout", "start", and "continue".`

const debugHash =
  "$2a$10$uBHufIPKvl7d4HSPwJuSLuaLheV9DM7CsBWrQfEjUGLpXcoPGG3Ra";

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
      doingSmth: "",
      str: "",
      whatEntered: "",
      email: "",
      password: "",
      studentID: "",
      typingPassword: false,
    };
  }

  async initTerm() {
    let waitTimes;
    let hasOpened = await AsyncStorage.getItem("hasSeenMainMenu");
    if (hasOpened == null) {
      waitTimes = [800, 20, 350, 920, 3, 5, 4, 1200];
      await AsyncStorage.setItem("hasSeenMainMenu", "true");
    } else {
      waitTimes = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    await wait(waitTimes[0]);
    this.xtermRef.terminal.write("ViriDOS Remote Operating System");
    await wait(waitTimes[1]);
    this.xtermRef.terminal.writeln(" - Version 0.7.2");
    await wait(waitTimes[2]);
    this.xtermRef.terminal.writeln(new Date().toString() + "\n");
    await wait(waitTimes[3]);
    this.xtermRef.terminal.writeln(
      "Please sign up or login before beginning the game."
    );
    await wait(waitTimes[4]);
    this.xtermRef.terminal.writeln("");
    this.xtermRef.terminal.writeln(
      "WARNING: USING 'START' WILL OVERWRITE YOUR GAME SAVE, IF YOU HAVE ALREADY STARTED THE GAME. IF YOU HAVE STARTED THE GAME BEFORE, DO NOT USE 'START' UNLESS YOU ARE SURE YOU WOULD LIKE TO RESTART."
    );
    this.xtermRef.terminal.writeln("");
    await wait(waitTimes[5]);
    this.xtermRef.terminal.writeln(
      AVAILABLE_COMMAND_STRING
    );
    await wait(waitTimes[6]);
    this.xtermRef.terminal.writeln(
      "Type in a command (without quotes), then press the ENTER key to run it.\n"
    );
    await wait(waitTimes[7]);
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
    if (this.state.doingSmth.length > 0) {
      str = this.state.str;
    }
    let index = buffer - str.length;
    if (code === 13) {
      this.setState({ typingPassword: false });
      if (this.state.doingSmth.length > 0) {
        this.xtermRef.terminal.writeln("");
        if (this.state.doingSmth == "login") {
          this.setState({ email: this.state.input });
          this.login2();
        } else if (this.state.doingSmth == "login2") {
          this.setState({ password: this.state.input });
          this.login3();
        } else if (this.state.doingSmth == "signup") {
          this.setState({ email: this.state.input });
          this.signUp2();
        } else if (this.state.doingSmth == "signup2") {
          this.setState({ password: this.state.input });
          this.signUp2p1();
        } else if (this.state.doingSmth == "signup2p1") {
          if (this.state.input == this.state.password) {
            this.setState({ password: this.state.input });
            this.signUp2p2();
          } else {
            this.setState({
              input: "",
              email: "",
              password: "",
              stuID: "",
              name: "",
              doingSmth: "",
            });
            this.xtermRef.terminal.writeln(
              "Passwords do not match. Please try to sign up again."
            );
            this.xtermRef.terminal.writeln("");
            this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
          }
        } else if (this.state.doingSmth == "signup2p2") {
          this.setState({ stuID: this.state.input });
          this.signUp2p3();
        } else if (this.state.doingSmth == "signup2p3") {
          this.setState({ name: this.state.input });
          this.signUp3();
        } else if (this.state.doingSmth == "debug") {
          this.setState({ debugPassword: this.state.input });
          this.debug2();
        }
      } else {
        if (this.state.input.trim().length == 0) {
          this.xtermRef.terminal.writeln("");
          this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
          return;
        }
        this.xtermRef.terminal.writeln("");
        const input = this.state.input.trim();
        if (input.toLowerCase() == "signup") {
          this.signUp();
          return;
        } else if (input.toLowerCase() == "login") {
          this.login();
          return;
        } else if (input.toLowerCase() == "logout") {
          this.logout();
          return;
        } else if (input.toLowerCase() == "start") {
          this.start();
          return;
        } else if (input.toLowerCase() == "continue") {
          this.continue();
          return;
        } else if (input.toLowerCase() == "help") {
          this.xtermRef.terminal.writeln(
            AVAILABLE_COMMAND_STRING
          );
        } else if (input.toLowerCase() == "debug") {
          this.debug();
          return;
        } else {
          this.xtermRef.terminal.writeln(
            `"` + input + `"` + " is not a valid command."
          );
          this.xtermRef.terminal.writeln(
            AVAILABLE_COMMAND_STRING
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
      this.setState({ input: "", doingSmth: "", typingPassword: false });
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
      if (this.state.typingPassword) {
        this.xtermRef.terminal.write("*");
      } else {
        this.xtermRef.terminal.write(data);
      }
      this.setState({ input: this.state.input.substring(0, index) + data });
    }
    // console.log(this.state.input);
  }

  async signUp() {
    const str1 = "Enter your email (do not use your student email): ";
    this.setState({ doingSmth: "signup", str: str1, input: "" });
    this.xtermRef.terminal.write(str1);
  }

  async signUp2() {
    const str1 = "Enter your password: ";
    this.setState({
      doingSmth: "signup2",
      str: str1,
      input: "",
      typingPassword: true,
    });
    this.xtermRef.terminal.write(str1);
  }

  async signUp2p1() {
    const str1 = "Verify your password: ";
    this.setState({
      doingSmth: "signup2p1",
      str: str1,
      input: "",
      typingPassword: true,
    });
    this.xtermRef.terminal.write(str1);
  }

  async signUp2p2() {
    const str1 = "Enter your student ID: ";
    this.setState({
      doingSmth: "signup2p2",
      str: str1,
      input: "",
      typingPassword: false,
    });
    this.xtermRef.terminal.write(str1);
  }

  async signUp2p3() {
    const str1 = "Enter your name: ";
    this.setState({
      doingSmth: "signup2p3",
      str: str1,
      input: "",
      typingPassword: false,
    });
    this.xtermRef.terminal.write(str1);
  }

  async signUp3() {
    this.xtermRef.terminal.writeln("Attempting to create account...");
    let res = await createAccount(
      this.state.email,
      this.state.password,
      this.state.name,
      this.state.stuID
    );
    this.xtermRef.terminal.writeln(res);
    this.xtermRef.terminal.writeln("");
    this.setState({ doingSmth: "" });
    this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    this.setState({ input: "", email: "", password: "" });
  }

  async login() {
    const str1 = "Enter your email: ";
    this.setState({ doingSmth: "login", str: str1, input: "" });
    this.xtermRef.terminal.write(str1);
  }

  async login2() {
    const str1 = "Enter your password: ";
    this.setState({
      doingSmth: "login2",
      str: str1,
      input: "",
      typingPassword: true,
    });
    this.xtermRef.terminal.write(str1);
  }

  async login3() {
    this.xtermRef.terminal.writeln("Attempting to login...");
    let res = await loginUser(this.state.email, this.state.password);
    this.xtermRef.terminal.writeln(res);
    this.xtermRef.terminal.writeln("");
    this.setState({ doingSmth: "" });
    this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    this.setState({ input: "", email: "", password: "" });
  }

  async logout() {
    let res = await logoutUser();
    this.xtermRef.terminal.writeln(res);
    this.setState({ doingSmth: "" });
    this.xtermRef.terminal.writeln("");
    this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    this.setState({ input: "", email: "", password: "" });
  }

  async start() {
    let loggedIn = isLoggedIn();
    if (loggedIn) {
      startGame();
      this.xtermRef.terminal.writeln("Initiating transmission...");
    } else {
      this.xtermRef.terminal.writeln(
        'Please login before playing. If you have not signed up, please do that, then login using the "login" command.'
      );
      this.setState({ doingSmth: "" });
      this.xtermRef.terminal.writeln("");
      this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    }
  }

  async continue() {
    let loggedIn = isLoggedIn();
    if (loggedIn) {
      continueGame();
    } else {
      this.xtermRef.terminal.writeln(
        'Please login before playing. If you have not signed up, please do that, then login using the "login" command.'
      );
      this.setState({ doingSmth: "" });
      this.xtermRef.terminal.writeln("");
      this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    }
  }

  async debug() {
    const str1 = "PASSWORD_REQUIRED: ";
    this.setState({
      doingSmth: "debug",
      str: str1,
      input: "",
      typingPassword: true,
    });
    this.xtermRef.terminal.write(str1);
  }

  async debug2() {
    if (await bcrypt.compareSync(this.state.debugPassword, debugHash)) {
      navigatePhase("Phase1");
      navigatePuzzle("StatusDebugPage");
    } else {
      this.xtermRef.terminal.writeln("Incorrect.");
    }
    this.xtermRef.terminal.writeln("");
    this.setState({ doingSmth: "" });
    this.xtermRef.terminal.write(PRIMARY_PROMPT_STRING);
    this.setState({
      input: "",
      debugPassword: "",
      typingPassword: false,
    });
  }

  componentDidMount() {
    this.initTerm();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.xtermRef.terminal.focus()} />
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
