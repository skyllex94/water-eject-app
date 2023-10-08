import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { startTimer, stopTimer, stopWaveformTimer } from "../../util/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../Context";

export default function OverallTestSong1({ currSoundTest, setCurrSoundTest }) {
  const { tests, setTests } = useContext(Context);

  // JK States and Refs
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTimeJK = 69; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (seconds > 59) {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
    if (!tests.isEnabledJKSong || (minutes === 1 && seconds === 9)) {
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      setTests((state) => ({ ...state, isEnabledJKSong: false }));
    }
  }, [seconds, waveformTime, tests.isEnabledJKSong]);

  async function enableJKSong() {
    setTests((state) => ({
      ...!state,
      isEnabledJKSong: !tests.isEnabledJKSong,
    }));

    await playSong();

    async function playSong() {
      if (!tests.isEnabledJKSong) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3")
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
    <TouchableOpacity className="overall-sound1 items-center">
      <TouchableOpacity
        className={`${
          tests.isEnabledJKSong ? "w-[95%] bg-[#4AD0EE] rounded-xl" : "w-[95%]"
        } `}
        onPress={enableJKSong}
      >
        <View
          className={`${
            tests.isEnabledJKSong
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                tests.isEnabledJKSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledJKSong ? "stop" : "play"}
                size={30}
                color="white"
              />
            </View>
            <SoundTestWave
              currentTime={waveformTime}
              totalTime={totalTimeJK}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
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
  );
}
