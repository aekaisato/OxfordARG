import {
  createAppContainer,
  NavigationNavigateAction,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  useCardAnimation,
} from "react-navigation-stack";
import { Puzzle1 } from "../../puzzles/puzzle_1_robotfix2/puzzle_1";
import { Puzzle2 } from "../../puzzles/puzzle_2_robotfix2/puzzle_2";

import { NavigationActions } from "react-navigation";
import { Puzzle10 } from "../../puzzles/puzzle_10_trail/puzzle_10";
import { Puzzle11 } from "../../puzzles/puzzle_11_pe/puzzle_11";
import { Puzzle12 } from "../../puzzles/puzzle_12_mops/puzzle_12_1";
import { Puzzle13 } from "../../puzzles/puzzle_13_morse/puzzle_13";
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

let _puzzleNavigator: any;
let _phaseNavigator: any;

export function setPuzzleNavigator(navigatorRef: any) {
  _puzzleNavigator = navigatorRef;
}

export function setPhaseNavigator(navigatorRef: any) {
  _phaseNavigator = navigatorRef;
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

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function roundNegative(x: number) {
  if (x < 0) {
    return 0;
  } else {
    return x;
  }
}

export const ThePuzzleNavigator = createStackNavigator(
  {
    StatusDebugPage: {
      screen: StatusDebugPage
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
    Puzzle4: {
      screen: Puzzle4Safe,
    },
    Puzzle5: {
      screen: Puzzle5Safe,
    },
    Puzzle6: {
      screen: Puzzle6,
    },
    Puzzle7: {
      screen: Puzzle7,
    },
    Puzzle8: {
      screen: Puzzle8,
    },
    Puzzle9: {
      screen: Puzzle9,
    },
    Puzzle10: {
      screen: Puzzle10,
    },
    Puzzle11: {
      screen: Puzzle11,
    },
    Puzzle12: {
      screen: Puzzle12,
    },
    Puzzle13: {
      screen: Puzzle13,
    },
    Puzzle14: {
      screen: Puzzle14,
    },
    Puzzle15: {
      screen: Puzzle15,
    },
    Puzzle16: {
      screen: Puzzle16,
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
            duration: 500
          },
        },
        close: {
          animation: "timing",
          config: {
            duration: 500
          },
        },
      },
    },
  }
);

export const PuzzleNavigator = createAppContainer(ThePuzzleNavigator);
