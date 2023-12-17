import React, { useContext, useState } from "react";

import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { resetVisualizer, stopDBMetering } from "../Utils/Funcs";
import { Context } from "../../contexts/Context";
import Waveform from "../ClearanceTab/Waveform";

export default function OverallTest() {
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);

  const [songs, setSongs] = useState([
    {
      name: "Overall Test 1 - JK",
      objName: "isEnabledJKSong",
      file: require("../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3"),
      totalTime: 69,
      loading: false,
      waveform: [
        15, 14, 17, 16, 23, 23, 27, 27, 10, 24, 24, 26, 22, 31, 22, 31, 25, 22,
        28, 26, 32, 24, 22, 28, 20, 30, 27, 22, 24, 27, 29, 22, 11,
      ],
    },
    {
      name: "Overall Test 2 - Zulu",
      objName: "isEnabledGoldLinkSong",
      file: require("../../assets/soundtests/goldlink.mp3"),
      totalTime: 45,
      loading: false,
      waveform: [
        30, 27, 11, 28, 24, 27, 21, 28, 29, 27, 22, 21, 29, 33, 31, 24, 21, 23,
        21, 22, 30, 29, 28, 24, 28, 30, 21, 24, 27, 21, 12, 25, 28,
      ],
    },
  ]);

  // Counter current time
  const [currTime, setCurrTime] = useState(0);
  // Waveform current progress
  const [progress, setProgress] = useState(0);

  async function enableSoundTest(curr, idx) {
    setSongs((songs) =>
      songs.map((song, songIdx) => {
        if (songIdx === idx) return { ...song, loading: true };
        return song;
      })
    );

    setCurrTime(0);
    setProgress(0);
    setSound((state) => ({
      ...!state,
      [curr.objName]: !sound[curr.objName],
    }));
    stopDBMetering(recording, setRecording);
    playSong();

    async function playSong() {
      if (!sound[curr.objName]) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          curr.file,
          { progressUpdateIntervalMillis: 1000 },
          (status) => {
            if (!isNaN(status.durationMillis)) {
              setProgress(
                Math.floor(
                  (status.positionMillis / status.durationMillis) * 100
                )
              );
              setCurrTime(Math.floor(status.positionMillis / 1000));
            }

            if (status.didJustFinish) unloadSound(sound, curr);
          }
        );

        setCurrSound(sound);
        resetVisualizer(setVisualizerParams);
        sound.playAsync();
      } else unloadSound(currSound, curr);

      setSongs((songs) =>
        songs.map((song, songIdx) => {
          if (songIdx === idx) return { ...song, loading: false };
          return song;
        })
      );
    }
  }

  async function unloadSound(sound, curr) {
    setSound((state) => ({ ...!state, [curr.objName]: false }));
    setCurrTime(0);
    setProgress(0);
    sound.unloadAsync() || undefined;
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 my-2 pb-3">
      <Text className="text-white m-5">Overall Sound</Text>

      {songs.map((curr, idx) => (
        <TouchableOpacity
          key={idx}
          className="overall-sound1 items-center my-1.5"
        >
          <TouchableOpacity
            className={`w-[95%] rounded-xl ${
              sound[curr.objName] && "bg-[#4AD0EE]"
            }`}
            onPress={() => enableSoundTest(curr, idx)}
          >
            <View
              className={`justify-between py-2 rounded-xl border-white ${
                sound[curr.objName] ? "bg-[#87E5FA]" : "bg-[#05103A]"
              }`}
            >
              <View className="flex-row items-center justify-start h-14">
                <View
                  className={`${
                    sound[curr.objName] ? "bg-[#87e5fa]" : "bg-[#101C43]"
                  } items-center justify-center w-12 h-12 mx-3 rounded-xl`}
                >
                  {curr.loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Icon
                      name={sound[curr.objName] ? "stop" : "play"}
                      size={30}
                      color="white"
                    />
                  )}
                </View>

                <View className="w-[75%]">
                  <Waveform
                    waveform={curr.waveform}
                    progress={sound[curr.objName] && progress}
                  />
                </View>
              </View>

              <View className="flex-row justify-between">
                <Text className="pt-2 ml-3 font-bold text-white">
                  {curr.name}
                </Text>
                <Text className="pt-2 mr-3 font-bold text-white">
                  {sound[curr.objName] ? Math.floor(currTime / 60) : "0"}:
                  {sound[curr.objName] ? currTime % 60 < 10 && "0" : 0}
                  {sound[curr.objName] ? currTime % 60 : 0} /{" "}
                  {Math.floor(curr.totalTime / 60)}:
                  {curr.totalTime % 60 < 10 && "0"}
                  {curr.totalTime % 60}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
}
