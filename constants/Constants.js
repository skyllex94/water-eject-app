export const defaultVisualizerParams = {
  speed: 500,
  frequency: 2,
  amplitude: 15,
};

// Audio Files

export const frequencies = [
  require("../assets/frequencies/lowesthz.mp3"),
  require("../assets/frequencies/lowhz.mp3"),
  require("../assets/frequencies/mediumhz.mp3"),
  require("../assets/frequencies/highhz.mp3"),
];

export const programs = {
  speakers: [
    require("../assets/programs/prep.mp3"),
    require("../assets/programs/main.mp3"),
  ],
  ear_speakers: require("../assets/programs/ear.mp3"),
  airpods: require("../assets/programs/airpods.mp3"),
};
