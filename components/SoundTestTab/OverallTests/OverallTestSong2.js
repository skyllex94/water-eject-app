import React, { useState, useContext } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { resetVisualizer, stopDBMetering } from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../../contexts/Context";

export default function OverallTestSong2() {
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
  const totalTimeGL = 45;
  const [loadingSound, setLoadingSound] = useState(false);

  async function unloadSound(sound) {
    sound.unloadAsync() || undefined;
    setSound((state) => ({ ...!state, isEnabledGoldLinkSong: false }));
    setCurrTime(0);
  }

  async function enableGoldLinkSong() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledGoldLinkSong: !sound.isEnabledGoldLinkSong,
    }));
    stopDBMetering(recording, setRecording);
    playSong();
  }

  async function playSong() {
    if (!sound.isEnabledGoldLinkSong) {
      if (currSound) currSound.pauseAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/soundtests/goldlink.mp3"),
        {
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
    <TouchableOpacity className="overall-sound2 items-center">
      <TouchableOpacity
        className={`${
          sound.isEnabledGoldLinkSong
            ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
            : "w-[95%] my-3"
        } `}
        onPress={enableGoldLinkSong}
      >
        <View
          className={`${
            sound.isEnabledGoldLinkSong
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabledGoldLinkSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              {loadingSound ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name={sound.isEnabledGoldLinkSong ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              )}
            </View>
            <SoundTestWave
              currentTime={sound.isEnabledGoldLinkSong ? currTime : 0}
              totalTime={totalTimeGL}
              waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              Overall Test 2 - Zulu
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {sound.isEnabledGoldLinkSong ? Math.floor(currTime / 60) : "0"}:
              {sound.isEnabledGoldLinkSong ? currTime % 60 < 10 && "0" : 0}
              {sound.isEnabledGoldLinkSong ? currTime % 60 : 0} /{" "}
              {Math.floor(totalTimeGL / 60)}:{totalTimeGL % 60 < 10 && "0"}
              {totalTimeGL % 60}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
