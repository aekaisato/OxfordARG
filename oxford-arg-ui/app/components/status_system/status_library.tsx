import { transcriptStrings } from "../video_player/transcript_strings";

const statusLibrary = [
  // shift pages and flags to match their actual location
  // add continue property to show when not to wait for next status
  {
    type: "puzzle",
    value: "StatusDebugPage",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene1Line1",
    save: true,
    continue: true,
  },
  {
    type: "livefeed",
    value: "Scene1",
    save: false,
  },
  {
    type: "livefeed",
    value: "Tutorial",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene2",
    save: false,
    endAt: 32,
  },
  {
    type: "communicator",
    value: "Scene3Line1",
    save: false,
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "livefeed",
    value: "STOP",
    save: false,
    continue: true,
  },
  {
    type: "puzzle",
    value: "Puzzle1",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene4Line1",
    save: false,
    mural: 1,
  },
  {
    type: "livefeed",
    value: "Scene5",
    save: true,
    endAt: 22,
  },
  {
    type: "communicator",
    value: "Scene6Line1",
    save: false,
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "livefeed",
    value: "STOP",
    save: false,
    continue: true,
  },
  {
    type: "puzzle",
    value: "Puzzle2",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene7Line1",
    save: false,
    mural: 2,
  },
  {
    type: "livefeed",
    value: "Scene8",
    save: true,
    endAt: 21,
  },
  {
    type: "communicator",
    value: "Scene9Line1",
    save: false,
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "livefeed",
    value: "STOP",
    save: false,
    continue: true,
  },
  {
    type: "puzzle",
    value: "Puzzle3",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene9",
    save: false,
    continue: true,
    splashScreenOnEnd: true,
  },
  {
    type: "communicator",
    value: "Scene10",
    continue: true,
  },
  {
    type: "transcript",
    value: transcriptStrings["Scene9Line2"],
    continue: true,
  },
  {
    type: "wait",
    value: 12000,
  },
  {
    type: "transcript",
    value: transcriptStrings["Scene10Line1"],
    continue: true,
  },
  {
    type: "music",
    value: "mus1",
    continue: true,
  },
  {
    type: "wait",
    value: 28000,
  },
  {
    type: "communicator",
    value: "Scene11Line1",
    page: 0,
  },
  {
    type: "wait",
    value: 500,
  },
  {
    type: "livefeed",
    value: "Scene12",
    endAt: 11,
    save: true,
  },
  {
    type: "communicator",
    value: "Scene12Line2",
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "360",
    value: "EnglishRoom",
    save: false,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene13Line1",
    blockGoto: true,
  },
  {
    type: "communicator",
    value: "Scene14Line1",
    page: 1,
  },
  {
    type: "communicator",
    value: "Scene14Line2",
  },
  {
    type: "livefeed",
    value: "Scene15",
    endAt: 17,
    save: true,
  },
  {
    type: "communicator",
    value: "Scene15Line2",
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "360",
    value: "OfficeRoom",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene16Line1",
    page: 2,
  },
  {
    type: "livefeed",
    value: "Scene17",
    save: true,
    endAt: 7,
  },
  {
    type: "communicator",
    value: "Scene17Line1",
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "360",
    value: "MathRoom",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene18",
    endAt: 15,
    page: 3,
    save: true,
  },
  {
    type: "communicator",
    value: "Scene19Line1",
  },
  {
    type: "wait",
    value: 500,
    save: false,
  },
  {
    type: "360",
    value: "ScienceRoom",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene19Line2",
    page: 4,
  },
  {
    type: "livefeed",
    value: "Scene20",
    endAt: 2,
  },
  {
    type: "music",
    value: "STOP",
    continue: true,
    save: false,
  },
  {
    type: "communicator",
    value: "Scene20Line1",
  },
  {
    type: "blackout",
    value: "blackout",
    save: false,
  },
  {
    type: "phase",
    value: "Phase2",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene20Line2",
  },
  {
    type: "music",
    value: "mus2",
    continue: true,
  },
  {
    type: "puzzle",
    value: "Puzzle8",
    save: false,
  },
  {
    type: "360",
    value: "LanguageRoom",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene21Line1",
    endAt: 34,
  },
  {
    type: "transcript",
    value: transcriptStrings["Scene21Line1P2"],
  },
  {
    type: "communicator",
    value: "Scene21Line2",
    endAt: 2,
    page: 5,
  },
  {
    type: "transcript",
    value: transcriptStrings["Scene21Line2P2"],
    continue: true,
  },
  {
    type: "wait",
    value: 4000,
  },
  {
    type: "livefeed",
    value: "Scene22",
    save: true,
  },
  {
    type: "360",
    value: "HistoryRoom",
    continue: true,
  },
  {
    blockGoto: true,
    type: "communicator",
    value: "Scene22Line1",
  },
  {
    type: "communicator",
    value: "Scene22Line2",
    page: 6,
  },
  {
    type: "livefeed",
    value: "Scene23",
    save: true,
    endAt: 9,
  },
  {
    type: "communicator",
    value: "Scene23Line2",
  },
  {
    type: "360",
    value: "PERoom",
    save: false,
  },
  {
    type: "communicator",
    value: "Scene23Line3",
    page: 7,
  },
  {
    type: "puzzle",
    value: "Puzzle12",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene24Line1",
    endAt: 11,
  },
  {
    type: "transcript",
    value: transcriptStrings["Scene24Line1P2"],
  },
  {
    type: "puzzle",
    value: "SplashScreen",
    continue: true,
    page: 8,
    save: true,
  },
  {
    type: "wait",
    value: 2000,
  },
  {
    type: "communicator",
    value: "Scene25Line1",
    continue: true,
  },
  {
    type: "wait",
    value: 500,
  },
  {
    type: "music",
    value: "mus3",
    continue: true,
  },
  {
    type: "wait",
    value: 17000,
  },
  {
    type: "ip_popup",
    value: "heck yea!",
    continue: true,
  },
  {
    type: "wait",
    value: 2000,
  },
  {
    type: "phase",
    value: "Phase3",
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene25Line2",
    endAt: 13,
  },
  {
    type: "puzzle",
    value: "Puzzle13",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene25",
    save: false,
    endAt: 1.3,
  },
  {
    type: "communicator",
    value: "Scene25Line3",
  },
  {
    type: "wait",
    value: 3500,
  },
  {
    type: "livefeed",
    value: "STOP",
    save: false,
    continue: true,
  },
  {
    type: "360",
    value: "ChoirRoom",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene26Line1",
    blockGoto: true,
  },
  {
    type: "puzzle",
    value: "SplashScreen",
    continue: true,
    page: 9,
  },
  {
    type: "communicator",
    value: "Scene26Line2",
  },
  {
    type: "wait",
    value: 2500,
  },
  {
    type: "communicator",
    value: "Scene27Line2",
  },
  {
    type: "livefeed",
    value: "Scene27",
    endAt: 3,
  },
  {
    type: "communicator",
    value: "Scene27Line3",
  },
  {
    type: "360",
    value: "PathwayRoom",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    blockGoto: true,
    value: "Scene27Line1",
  },
  {
    type: "transcript",
    value: "Use the notebook. Solve the puzzle. Discover our secret.",
    continue: true,
    save: true,
    page: 10,
  },
  {
    type: "puzzle",
    value: "Puzzle16",
    save: false,
  },
  {
    type: "music",
    value: "STOP",
    continue: true,
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene28",
    endAt: 10,
  },
  {
    type: "communicator",
    value: "Scene28Line1",
  },
  {
    type: "wait",
    value: 12000,
  },
  {
    type: "communicator",
    value: "Scene30Line1",
  },
  {
    type: "wait",
    value: 2000,
  },
  {
    type: "communicator",
    value: "Scene30Line2",
  },
  {
    type: "completion",
    value: "",
    save: false,
    continue: true,
  },
  {
    type: "phase",
    value: "CompletionScreen",
    save: true,
  },
];

export { statusLibrary };
