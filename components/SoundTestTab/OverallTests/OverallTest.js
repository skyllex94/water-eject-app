import React, { useContext, useState } from "react";

import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { resetVisualizer, stopDBMetering } from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../../contexts/Context";

import OverallTestSong1 from "./OverallTestSong1";
import OverallTestSong2 from "./OverallTestSong2";

export default function OverallTest() {
  // TODO: Take out all the sounds, create and object to populate both of them and input it

  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);

  const overallTests = [
    {
      name: "Overall Test 1 - JK",
      objName: "isEnabledJKSong",
      file: require("../../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3"),
      totalTime: 69,
    },
    {
      name: "Overall Test 2 - Zulu",
      objName: "isEnabledGoldLinkSong",
      file: require("../../../assets/soundtests/goldlink.mp3"),
      totalTime: 45,
    },
  ];

  const [currTime, setCurrTime] = useState(0);
  const totalTimeJK = 69; // in seconds
  const [loadingSound, setLoadingSound] = useState(false);

  async function enableSoundTest(curr) {
    setLoadingSound(true);
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
            if (!isNaN(status.durationMillis))
              setCurrTime(Math.floor(status.positionMillis / 1000));
            if (status.didJustFinish) unloadSound(sound);
          }
        );

        setCurrSound(sound);
        resetVisualizer(setVisualizerParams);
        sound.playAsync();
      } else unloadSound(currSound, curr);

      setLoadingSound(false);
    }
  }

  async function unloadSound(sound, curr) {
    setSound((state) => ({ ...!state, [curr.objName]: false }));
    setCurrTime(0);
    sound.unloadAsync() || undefined;
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3">
      <Text className="text-white m-5">Overall Sound</Text>

      {overallTests.map((curr, idx) => (
        <TouchableOpacity
          key={idx}
          className="overall-sound1 items-center my-2"
        >
          <TouchableOpacity
            className={`w-[95%] rounded-xl ${
              sound[curr.objName] && "bg-[#4AD0EE] "
            }`}
            onPress={enableSoundTest}
          >
            <View
              className={`justify-between py-2 rounded-xl border-white ${
                sound[curr.objName] ? "bg-[#87E5FA]" : "bg-[#05103A]"
              }`}
            >
              <View className="flex-row h-14">
                <View
                  className={`${
                    sound[curr.objName] ? "bg-[#87e5fa]" : "bg-[#101C43]"
                  } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
                >
                  {loadingSound ? (
                    <ActivityIndicator />
                  ) : (
                    <Icon
                      name={sound[curr.objName] ? "stop" : "play"}
                      size={30}
                      color="white"
                    />
                  )}
                </View>
                <SoundTestWave
                  currentTime={sound[curr.objName] ? currTime : 0}
                  totalTime={curr.totalTime}
                  waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
                />
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

      {/*
      <TouchableOpacity className="overall-sound1 items-center">
        <TouchableOpacity
          className={`${
            sound.isEnabledJKSong
              ? "w-[95%] bg-[#4AD0EE] rounded-xl"
              : "w-[95%]"
          } `}
          onPress={enableSoundTest}
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
                <OverallTestSong2 />*/}
    </View>
  );
}
