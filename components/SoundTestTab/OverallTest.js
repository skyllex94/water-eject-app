import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import { startTimer, stopTimer, stopWaveformTimer } from "../util/Funcs";
import SoundTestWave from "./SoundTestWave";

export default function OverallTest({ currSoundTest, setCurrSoundTest }) {
  const [isEnabledJKSong, setIsEnabledJKSong] = useState(false);

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
    setIsEnabledJKSong((prev) => !prev);
    await playJKSong(!isEnabledJKSong);
  }

  async function playJKSong(isEnabled) {
    if (isEnabled) {
      if (currSoundTest) currSoundTest.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3`),
        { isLooping: true }
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

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-8">
      <Text className="text-white ml-3 mt-3">Test Overall Sound</Text>

      <TouchableOpacity className="sound1 items-center">
        <TouchableOpacity
          className={`${
            isEnabledJKSong
              ? "w-[95%] bg-[#4AD0EE] py-3 my-3 rounded-xl"
              : "w-[95%] py-3 my-3"
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

      <TouchableOpacity className="sound2 items-center">
        <TouchableOpacity
          className={`${
            isEnabledJKSong
              ? "w-[95%] bg-[#4AD0EE] py-3 my-3 rounded-xl"
              : "w-[95%] py-3 my-3"
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
