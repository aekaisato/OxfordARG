import {
  createAppContainer,
  NavigationContainerComponent,
} from "react-navigation";
import {
  createStackNavigator,
} from "react-navigation-stack";
import { Puzzle1 } from "../../puzzles/puzzle_1_robotfix1/puzzle_1";
import { Puzzle2 } from "../../puzzles/puzzle_2_robotfix2/puzzle_2";

import { NavigationActions } from "react-navigation";
import { Puzzle10 } from "../../puzzles/puzzle_10_trail/puzzle_10";
import { Puzzle11 } from "../../puzzles/puzzle_11_pe/puzzle_11";
import { Puzzle12 } from "../../puzzles/puzzle_12_lights/puzzle_12";
import { Puzzle13 } from "../../puzzles/puzzle_13_map2/puzzle_13";
import { Puzzle14 } from "../../puzzles/puzzle_14_piano/puzzle_14";
import { Puzzle15 } from "../../puzzles/puzzle_15_navigator/puzzle_15";
import { Puzzle3 } from "../../puzzles/puzzle_3_mural/puzzle_3";
import { Puzzle6 } from "../../puzzles/puzzle_6_sudoku/puzzle_6";
import { Puzzle7 } from "../../puzzles/puzzle_7_ptable/puzzle_7";
import { Puzzle9 } from "../../puzzles/puzzle_9_language/puzzle_9";
import { Puzzle16 } from "../../puzzles/puzzle_16_finaljournal/puzzle_16";
import { Puzzle4Safe } from "../../puzzles/puzzle_4_caesarcipher/puzzle_4_safe";
import { Puzzle5Safe } from "../../puzzles/puzzle_5_posters/puzzle_5_safe";
import { Puzzle8 } from "../../puzzles/puzzle_8_map1/puzzle_8";
import { StatusDebugPage } from "../status_system/status_system";
import { ChoirRoom } from "../../rooms/choir/choir";
import { MathRoom } from "../../rooms/math/math";
import { Puzzle4Book } from "../../puzzles/puzzle_4_caesarcipher/puzzle_4_book";
import { Puzzle5Crossword } from "../../puzzles/puzzle_5_posters/puzzle_5_crossword";
import { EnglishRoom } from "../../rooms/english/english";
import { OfficeRoom } from "../../rooms/office/office";
import { ScienceRoom } from "../../rooms/science/science";
import { LanguageRoom } from "../../rooms/language/language";
import { HistoryRoom } from "../../rooms/history/history";
import { PERoom } from "../../rooms/pe/pe";
import { PathwayRoom } from "../../rooms/pathway/pathway";
import { SplashScreen } from "../../other/splash_screen";
import { LiveFeed } from "../live_feed/live_feed";
import { SoundTest } from "../sound_system/sound_system";
import React from "react";
import { View } from "react-native";

let _puzzleNavigator: NavigationContainerComponent;
let _phaseNavigator: NavigationContainerComponent;

export function setPuzzleNavigator(navigatorRef: any) {
  _puzzleNavigator = navigatorRef;
}

export function setPhaseNavigator(navigatorRef: any) {
  _phaseNavigator = navigatorRef;
}

export function getCurrentPhase() {
  if (_phaseNavigator == undefined || _phaseNavigator == null) {
    console.warn("current phase undefined");
    return;
  }
  let navState = _phaseNavigator.state.nav;
  let phase = navState.routes[navState.index].routeName;
  console.log(phase);
  return phase;
}

export function navigatePuzzle(routeName: any, params?: any) {
  console.log("attempting to navigate to " + routeName);
  _puzzleNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export function navigatePhase(routeName: any, params?: any) {
  _phaseNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export function toLiveFeed() {
  console.log("nav to live feed");
  _puzzleNavigator.dispatch(
    NavigationActions.navigate({ routeName: "LiveFeed" })
  );
}

const forFade = ({ current, closing }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

class BlankScreen extends React.Component {
  render() {
    return (
      <View
        style={{ backgroundColor: "black", width: "100%", height: "100%" }}
      />
    );
  }
}

export const ThePuzzleNavigator = createStackNavigator(
  {
    BlankScreen: {
      screen: BlankScreen,
    },
    SplashScreen: {
      screen: SplashScreen,
    },
    StatusDebugPage: {
      screen: StatusDebugPage,
    },
    SoundTest: {
      screen: SoundTest,
      navigationOptions: {
        headerShown: true,
      },
    },
    LiveFeed: {
      screen: LiveFeed,
    },
    Puzzle1: {
      screen: Puzzle1,
    },
    Puzzle2: {
      screen: Puzzle2,
    },
    Puzzle3: {
      screen: Puzzle3,
    },
    Puzzle4Book: {
      screen: Puzzle4Book,
      navigationOptions: {
        headerShown: true,
        title: "A Book",
      },
    },
    Puzzle4Safe: {
      screen: Puzzle4Safe,
      navigationOptions: {
        headerShown: true,
        title: "A Safe",
      },
    },
    Puzzle5Crossword: {
      screen: Puzzle5Crossword,
      navigationOptions: {
        headerShown: true,
        title: "A Few Posters",
      },
    },
    Puzzle5Safe: {
      screen: Puzzle5Safe,
      navigationOptions: {
        headerShown: true,
        title: "A Safe",
      },
    },
    Puzzle6: {
      screen: Puzzle6,
      navigationOptions: {
        headerShown: true,
        title: "A Strange Safe",
      },
    },
    Puzzle7: {
      screen: Puzzle7,
      navigationOptions: {
        headerShown: true,
        title: "Periodic Table",
      },
    },
    Puzzle8: {
      screen: Puzzle8,
    },
    Puzzle9: {
      screen: Puzzle9,
      navigationOptions: {
        headerShown: true,
        title: "Locked Cabinet",
      },
    },
    Puzzle10: {
      screen: Puzzle10,
      navigationOptions: {
        headerShown: true,
        title: "A Very Odd Safe",
      },
    },
    Puzzle11: {
      screen: Puzzle11,
      navigationOptions: {
        headerShown: true,
        title: "Pong?",
      },
    },
    Puzzle12: {
      screen: Puzzle12,
    },
    Puzzle13: {
      screen: Puzzle13,
    },
    Puzzle14: {
      screen: Puzzle14,
      navigationOptions: {
        headerShown: true,
        title: "Piano",
      },
    },
    Puzzle15: {
      screen: Puzzle15,
      navigationOptions: {
        headerShown: true,
        title: "Laptop Screen",
      },
    },
    Puzzle16: {
      screen: Puzzle16,
    },
    EnglishRoom: {
      screen: EnglishRoom,
    },
    OfficeRoom: {
      screen: OfficeRoom,
    },
    MathRoom: {
      screen: MathRoom,
    },
    ScienceRoom: {
      screen: ScienceRoom,
    },
    LanguageRoom: {
      screen: LanguageRoom,
    },
    HistoryRoom: {
      screen: HistoryRoom,
    },
    PERoom: {
      screen: PERoom,
    },
    ChoirRoom: {
      screen: ChoirRoom,
    },
    PathwayRoom: {
      screen: PathwayRoom,
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

export const PuzzleNavigator = createAppContainer(ThePuzzleNavigator);
