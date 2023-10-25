import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import {
  resetVisualizer,
  startTimer,
  stopTimer,
  stopWaveformTimer,
} from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../../contexts/Context";

export default function OverallTestSong1() {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);

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
    if (!sound.isEnabledJKSong || (minutes === 1 && seconds === 9)) {
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      setSound((state) => ({ ...state, isEnabledJKSong: false }));
    }
  }, [seconds, waveformTime, sound.isEnabledJKSong]);

  async function enableJKSong() {
    setSound((state) => ({
      ...!state,
      isEnabledJKSong: !sound.isEnabledJKSong,
    }));

    await playSong();

    async function playSong() {
      if (!sound.isEnabledJKSong) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/soundtests/jk-whoisjk-baby-what-u-wanna-do.mp3")
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);

        // Start the audio timer state
        startTimer(refCounter, setSeconds);
        startTimer(refWaveFormCounter, setWaveformTime);

        sound.playAsync();
      } else {
        currSound.unloadAsync() || undefined;
        stopTimer(refCounter, setSeconds, setMinutes);
        stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      }
    }
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
          className={`${
            sound.isEnabledJKSong
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabledJKSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledJKSong ? "stop" : "play"}
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
