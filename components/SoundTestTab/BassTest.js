import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

import { startTimer, stopTimer, stopWaveformTimer } from "../util/Funcs";
import SoundTestWave from "./SoundTestWave";

export default function BassTest({ currSoundTest, setCurrSoundTest }) {
  const [isEnabledJKSong, setIsEnabledJKSong] = useState(false);
  const [isEnabledGoldLinkSong, setIsEnabledGoldLinkSong] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 69; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (seconds > 59) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
    if (!isEnabledJKSong || (minutes === 1 && seconds === 9)) {
      setMinutes(0);
      setSeconds(0);
      setWaveformTime(0);
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
    }
  }, [seconds, waveformTime, isEnabledJKSong]);

  async function enableJKSong() {
    setIsEnabledGoldLinkSong(false);
    setIsEnabledJKSong((prev) => !prev);
    await playSong();

    async function playSong() {
      if (!isEnabledJKSong) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();

        // Start the audio timer state
        startTimer(refCounter, setSeconds);
        startTimer(refWaveFormCounter, setWaveformTime);
      } else {
        currSoundTest.unloadAsync() || undefined;
        stopTimer(refCounter, setSeconds, setMinutes);
        stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      }
    }
  }

  async function enableGoldLinkSong() {
    setIsEnabledJKSong(false);
    setIsEnabledGoldLinkSong((prev) => !prev);
    await playSong();

    async function playSong() {
      if (!isEnabledGoldLinkSong) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/goldlink.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();

        // Start the audio timer state
        startTimer(refCounter, setSeconds);
        startTimer(refWaveFormCounter, setWaveformTime);
      } else {
        currSoundTest.unloadAsync() || undefined;
        stopTimer(refCounter, setSeconds, setMinutes);
        stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      }
    }
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <Text className="text-white ml-3 m-4">Bass Accuracy</Text>

      <TouchableOpacity className="overall-sound1 items-center">
        <TouchableOpacity
          className={`${
            isEnabledJKSong ? "w-[95%] bg-[#4AD0EE] rounded-xl" : "w-[95%]"
          } `}
          onPress={enableJKSong}
        >
          <View
            className={`${
              isEnabledJKSong
                ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
                : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
            }  `}
          >
            <View className="flex-row h-14">
              <View
                className={`${
                  isEnabledJKSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
                } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
              >
                <Icon
                  name={isEnabledJKSong ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              </View>
              <SoundTestWave
                currentTime={waveformTime}
                totalTime={totalTime}
                waveform={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
              />
            </View>

            <View className="flex-row justify-between">
              <Text className="pt-2 ml-3 font-bold text-white">
                JK - Baby What You Wanna Do
              </Text>
              <Text className="pt-2 mr-3 font-bold text-white">
                {minutes}:{seconds < 10 && "0"}
                {seconds} / 1:09
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity className="overall-sound2 items-center">
        <TouchableOpacity
          className={`${
            isEnabledGoldLinkSong
              ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
              : "w-[95%] my-3"
          } `}
          onPress={enableGoldLinkSong}
        >
          <View
            className={`${
              isEnabledGoldLinkSong
                ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
                : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
            }  `}
          >
            <View className="flex-row h-14">
              <View
                className={`${
                  isEnabledGoldLinkSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
                } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
              >
                <Icon
                  name={isEnabledGoldLinkSong ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              </View>
              <SoundTestWave
                currentTime={waveformTime}
                totalTime={totalTime}
                waveform={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
              />
            </View>

            <View className="flex-row justify-between">
              <Text className="pt-2 ml-3 font-bold text-white">
                GoldLink - Zulu Screams
              </Text>
              <Text className="pt-2 mr-3 font-bold text-white">
                {minutes}:{seconds < 10 && "0"}
                {seconds} / 0:46
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
