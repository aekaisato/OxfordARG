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
    splashScreenOnEnd: true
  },
  {
    type: "communicator",
    value: "Scene9Line2",
    endAt: 9,
  },
  {
    type: "music",
    value: "mus1",
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene10Line1",
  },
  {
    type: "360",
    value: "EnglishRoom",
    save: false,
    page: 0,
  },
  {
    type: "360",
    value: "OfficeRoom",
    save: false,
    page: 1,
  },
  {
    type: "360",
    value: "MathRoom",
    save: false,
    page: 2,
  },
  /*
  {
    type: "puzzle",
    value: "Puzzle6",
    save: true,
  },
  //*/
  {
    type: "360",
    value: "ScienceRoom",
    save: false,
    page: 3,
  },
  {
    type: "music",
    value: "STOP",
    page: 4,
    continue: true,
    save: false,
  },
  {
    type: "blackout",
    value: "blackout",
    save: false,
  },
  {
    type: "phase",
    value: "Phase2",
    save: false,
    continue: true,
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
    save: false,
  },
  {
    type: "360",
    value: "HistoryRoom",
    save: false,
    page: 5,
  },
  {
    type: "360",
    value: "PERoom",
    save: false,
    page: 6,
  },
  {
    type: "puzzle",
    value: "Puzzle12",
    save: false,
    page: 7,
  },
  {
    type: "phase",
    value: "Phase3",
    save: false,
    page: 8,
    continue: true,
  },
  {
    type: "music",
    value: "mus3",
    continue: true,
  },
  {
    type: "puzzle",
    value: "Puzzle13",
    save: false,
  },
  {
    type: "360",
    value: "ChoirRoom",
    save: false,
  },
  /*
  {
    type: "puzzle",
    value: "Puzzle14",
    save: false,
  },
  //*/
  {
    type: "360",
    value: "PathwayRoom",
    save: false,
    page: 9,
  },
  {
    type: "puzzle",
    value: "Puzzle16",
    save: false,
    page: 10,
  },
  {
    type: "music",
    value: "STOP",
    continue: true,
    save: false,
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
    save: false,
  },
];

export { statusLibrary };
