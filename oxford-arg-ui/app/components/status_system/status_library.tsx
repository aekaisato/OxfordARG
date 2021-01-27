const statusLibrary = [
  // shift pages and flags to match their actual location
  // add continue property to show when not to wait for next status
  {
    type: "puzzle",
    value: "StatusDebugPage",
    save: false,
  },
  {
    type: "livefeed",
    value: "Scene1",
    save: true,
    continue: true,
  },
  {
    type: "communicator",
    value: "Scene1Line1",
    save: false,
  },
  {
    type: "puzzle",
    value: "Puzzle1",
    save: true,
  },
  {
    type: "puzzle",
    value: "Puzzle2",
    save: true,
    mural: 1,
  },
  {
    type: "puzzle",
    value: "Puzzle3",
    save: true,
    mural: 2,
  },
  {
    type: "music",
    value: "mus1",
    continue: true,
  },
  {
    type: "360",
    value: "EnglishRoom",
    save: true,
    page: 0,
  },
  {
    type: "360",
    value: "OfficeRoom",
    save: true,
    page: 1,
  },
  {
    type: "360",
    value: "MathRoom",
    save: true,
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
    save: true,
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
    save: true,
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
    save: true,
  },
  {
    type: "360",
    value: "HistoryRoom",
    save: true,
    page: 5,
  },
  {
    type: "360",
    value: "PERoom",
    save: true,
    page: 6,
  },
  {
    type: "puzzle",
    value: "Puzzle12",
    save: true,
    page: 7,
  },
  {
    type: "phase",
    value: "Phase3",
    save: true,
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
    save: true,
  },
  {
    type: "360",
    value: "ChoirRoom",
    save: true,
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
    save: true,
    page: 9,
  },
  {
    type: "puzzle",
    value: "Puzzle16",
    save: true,
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
    save: true,
  },
];

export { statusLibrary };
