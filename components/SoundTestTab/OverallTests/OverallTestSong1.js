import React, { useState, useContext } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { resetVisualizer, stopDBMetering } from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../../contexts/Context";

export default function OverallTestSong1() {
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);

  const [currTime, setCurrTime] = useState(0);
  const totalTimeJK = 69; // in seconds
  const [loadingSound, setLoadingSound] = useState(false);

  async function enableJKSong() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledJKSong: !sound.isEnabledJKSong,
    }));
    stopDBMetering(recording, setRecording);

    playSong();
  }

  async function unloadSound(sound) {
    sound.unloadAsync() || undefined;
    setSound((state) => ({ ...!state, isEnabledJKSong: false }));
    setCurrTime(0);
  }

  async function playSong() {
    if (!sound.isEnabledJKSong) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3"),
        {
          isLooping: false,
          progressUpdateIntervalMillis: 1000,
        },
        (status) => {
          if (!isNaN(status.durationMillis))
            setCurrTime(Math.floor(status.positionMillis / 1000));
          if (status.didJustFinish) unloadSound(sound);
        }
      );

      setCurrSound(sound);
      resetVisualizer(setVisualizerParams);
      sound.playAsync();
    } else unloadSound(currSound);

    setLoadingSound(false);
  }

  return (
    <TouchableOpacity className="overall-sound1 items-center">
      <TouchableOpacity
        className={`${
          sound.isEnabledJKSong ? "w-[95%] bg-[#4AD0EE] rounded-xl" : "w-[95%]"
        } `}
        onPress={enableJKSong}
      >
        <View
          className={`justify-between py-2 rounded-xl border-white ${
            sound.isEnabledJKSong ? "bg-[#87E5FA]" : "bg-[#05103A]"
          }`}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabledJKSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              {loadingSound ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name={sound.isEnabledJKSong ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              )}
            </View>
            <SoundTestWave
              currentTime={sound.isEnabledJKSong ? currTime : 0}
              totalTime={totalTimeJK}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              Overall Test 1 - JK
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {sound.isEnabledJKSong ? Math.floor(currTime / 60) : "0"}:
              {sound.isEnabledJKSong ? currTime % 60 < 10 && "0" : 0}
              {sound.isEnabledJKSong ? currTime % 60 : 0} /{" "}
              {Math.floor(totalTimeJK / 60)}:{totalTimeJK % 60 < 10 && "0"}
              {totalTimeJK % 60}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
