import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import firebase from "firebase/app";

import { Phase1Layout } from "./app/layouts/phase1_layout/phase1_layout";
import { Phase2Layout } from "./app/layouts/phase2_layout/phase2_layout";
import { Phase3Layout } from "./app/layouts/phase3_layout/phase3_layout";
import { setPhaseNavigator } from "./app/components/navigation/navigation";
import { initProgress } from "./app/components/status_system/status_system";
import { IPPopup } from "./app/other/ip_popup";
import { BlackoutTransition } from "./app/other/blackout_transition";
import { MainMenu } from "./app/other/main_menu";
import { CompletionScreen } from "./app/other/completion_screen";

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
      "Metropolis-Black": require("./assets/fonts/metropolis/Metropolis-Black.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-BlackItalic": require("./assets/fonts/metropolis/Metropolis-BlackItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-BoldItalic": require("./assets/fonts/metropolis/Metropolis-BoldItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ExtraBold": require("./assets/fonts/metropolis/Metropolis-ExtraBold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ExtraBoldItalic": require("./assets/fonts/metropolis/Metropolis-ExtraBoldItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ExtraLight": require("./assets/fonts/metropolis/Metropolis-ExtraLight.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ExtraLightItalic": require("./assets/fonts/metropolis/Metropolis-ExtraLightItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-RegularItalic": require("./assets/fonts/metropolis/Metropolis-RegularItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-SemiBoldItalic": require("./assets/fonts/metropolis/Metropolis-SemiBoldItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Light": require("./assets/fonts/metropolis/Metropolis-Light.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-LightItalic": require("./assets/fonts/metropolis/Metropolis-LightItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-MediumItalic": require("./assets/fonts/metropolis/Metropolis-MediumItalic.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Thin": require("./assets/fonts/metropolis/Metropolis-Thin.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ThinItalic": require("./assets/fonts/metropolis/Metropolis-ThinItalic.ttf"),
    });
    await Font.loadAsync({
      "SourceCodePro-Regular": require("./assets/fonts/SourceCodePro-Regular.ttf"),
    });
    this.fontsLoaded = true;
  }

  async initializeApp() {
    try {
      let tempDiv = document.getElementById("isLoadingDiv");
      tempDiv?.parentNode?.removeChild(tempDiv);
    } catch (e) {
      console.warn(e);
    }
    await this.loadFonts();
  }

  async componentDidMount() {
    await this.initializeApp();
    //await wait(1000);
    this.forceUpdate();
  }

  render() {
    if (!this.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <React.Fragment>
          <AppNavigator
            ref={(navigatorRef) => {
              setPhaseNavigator(navigatorRef);
            }}
          />
          <IPPopup />
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
    MainMenu: {
      screen: MainMenu,
    },
    Phase1: {
      screen: Phase1Layout,
    },
    Phase2: {
      screen: Phase2Layout,
    },
    Phase3: {
      screen: Phase3Layout,
    },
    BlackoutTransition: {
      screen: BlackoutTransition,
    },
    CompletionScreen: {
      screen: CompletionScreen,
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
