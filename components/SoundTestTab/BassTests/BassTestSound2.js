import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

import { startTimer, stopTimer, stopWaveformTimer } from "../../util/Funcs";
import SoundTestWave from "../SoundTestWave";
import { useContext } from "react";
import { Context } from "../../Context";

export default function BassTestSound2({}) {
  const { tests, setTests, currSoundTest, setCurrSoundTest } =
    useContext(Context);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 46; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (!tests.isEnabled151Rum || (minutes === 0 && seconds === totalTime)) {
      setMinutes(0);
      setSeconds(0);
      setWaveformTime(0);
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      setTests((state) => ({ ...state, isEnabled151Rum: false }));
    }
  }, [seconds, waveformTime, tests.isEnabled151Rum]);

  async function enableGoldLinkSong() {
    setTests((state) => ({
      ...!state,
      isEnabled151Rum: !tests.isEnabled151Rum,
    }));

    await playSong();

    async function playSong() {
      if (!tests.isEnabled151Rum) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/soundtests/151-rum.mp3")
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
    <TouchableOpacity className="overall-sound2 items-center">
      <TouchableOpacity
        className={`${
          tests.isEnabled151Rum
            ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
            : "w-[95%] my-3"
        } `}
        onPress={enableGoldLinkSong}
      >
        <View
          className={`${
            tests.isEnabled151Rum
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                tests.isEnabled151Rum ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabled151Rum ? "stop" : "play"}
                size={30}
                color="white"
              />
            </View>
            <SoundTestWave
              currentTime={waveformTime}
              totalTime={totalTime}
              waveform={"http://w1.sndcdn.com/fxguEjG4ax6B_m.png"}
              height={65}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              Bass Instrumental - 151 Rum
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {minutes}:{seconds < 10 && "0"}
              {seconds} / 0:46
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
