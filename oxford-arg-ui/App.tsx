import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { default as appTheme } from "./custom-theme.json";
import { mapping } from "@eva-design/eva";
import { light as lightTheme } from "@eva-design/eva";
import { default as darkTheme } from "./dark-mapping.json";
import { default as customMapping } from "./custom-mapping.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import firebase from "firebase/app";

import { Phase1Layout } from "./app/layouts/phase1_layout/phase1_layout";
import { Phase2Layout } from "./app/layouts/phase2_layout/phase2_layout";
import { Phase3Layout } from "./app/layouts/phase3_layout/phase3_layout";
import { setPhaseNavigator } from "./app/components/navigation/navigation";
import { initProgress } from "./app/components/status_system/status_system";
import { IPPopup } from "./app/other/ip_popup";

var firebaseConfig = {
  apiKey: "AIzaSyAyKgYHFgHghjs5xmKe-Lcfbw9uLX7nq10",
  authDomain: "viridos-735a4.firebaseapp.com",
  databaseURL: "https://viridos-735a4-default-rtdb.firebaseio.com",
  projectId: "viridos-735a4",
  storageBucket: "viridos-735a4.appspot.com",
  messagingSenderId: "733706320390",
  appId: "1:733706320390:web:5a2ceb2aafbec9bf1ea187",
  measurementId: "G-K2EQGJJKDS",
};

firebase.initializeApp(firebaseConfig);

const theme = { ...darkTheme };

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default class App extends React.Component {
  fontsLoaded = false;

  async loadFonts() {
    await Font.loadAsync({
      "Courier-Prime": require("./assets/fonts/courier-prime/Courier-Prime.ttf"),
    });
    await Font.loadAsync({
      "Courier-Prime-Bold": require("./assets/fonts/courier-prime/Courier-Prime-Bold.ttf"),
    });
    await Font.loadAsync({
      "Courier-Prime-Italic": require("./assets/fonts/courier-prime/Courier-Prime-Italic.ttf"),
    });
    await Font.loadAsync({
      "Courier-Prime-Bold-Italic": require("./assets/fonts/courier-prime/Courier-Prime-Bold-Italic.ttf"),
    });
    await Font.loadAsync({
      "Noto-Sans": require("./assets/fonts/noto-sans/NotoSans-Regular.ttf"),
    });
    await Font.loadAsync({
      "Noto-Sans-Bold": require("./assets/fonts/noto-sans/NotoSans-Bold.ttf"),
    });
    await Font.loadAsync({
      "Noto-Sans-Italic": require("./assets/fonts/noto-sans/NotoSans-Italic.ttf"),
    });
    await Font.loadAsync({
      "Noto-Sans-Bold-Italic": require("./assets/fonts/noto-sans/NotoSans-BoldItalic.ttf"),
    });
    await Font.loadAsync({
      VT323: require("./assets/fonts/VT323-Regular.ttf"),
    });
    await Font.loadAsync({
      "EB-Garamond": require("./assets/fonts/EBGaramond-VariableFont_wght.ttf"),
    });
    await Font.loadAsync({
      "EB-Garamond-Italic": require("./assets/fonts/EBGaramond-Italic-VariableFont_wght.ttf"),
    });
    this.fontsLoaded = true;
  }

  async initializeApp() {
    await this.loadFonts();
  }

  async componentDidMount() {
    await this.initializeApp();
    await wait(1000);
    this.forceUpdate();
  }

  render() {
    if (!this.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <React.Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            mapping={mapping}
            theme={theme}
            customMapping={customMapping}
          >
            <AppNavigator
              ref={(navigatorRef) => {
                setPhaseNavigator(navigatorRef);
              }}
            />
            <IPPopup/>
          </ApplicationProvider>
        </React.Fragment>
      );
    }
  }
}

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const StackNavigator = createStackNavigator(
  {
    Phase1: {
      screen: Phase1Layout,
      navigationOptions: {
        headerShown: false,
      },
    },
    Phase2: {
      screen: Phase2Layout,
      navigationOptions: {
        headerShown: false,
      },
    },
    Phase3: {
      screen: Phase3Layout,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      cardStyleInterpolator: forFade,
      transitionSpec: {
        open: {
          animation: "timing",
          config: {
            duration: 500,
          },
        },
        close: {
          animation: "timing",
          config: {
            duration: 500,
          },
        },
      },
    },
  }
);

export const AppNavigator = createAppContainer(StackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
