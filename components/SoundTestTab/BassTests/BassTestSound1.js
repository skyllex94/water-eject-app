import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  openPurchaseModal,
  resetVisualizer,
  startTimer,
  stopDBMetering,
  stopTimer,
  stopWaveformTimer,
} from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { useContext } from "react";
import { Context } from "../../../contexts/Context";
import useRevenueCat from "../../../hooks/useRevenueCat";

export default function BassTestSound1({ navigation }) {
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);
  const { isProMember } = useRevenueCat();
  const [loadingSound, setLoadingSound] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 39; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (!sound.isEnabledUsedTo || (minutes === 0 && seconds === totalTime)) {
      setMinutes(0);
      setSeconds(0);
      setWaveformTime(0);
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      setSound((state) => ({ ...state, isEnabledUsedTo: false }));
    }
  }, [seconds, waveformTime, sound.isEnabledUsedTo]);

  async function enableUsedToTest() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledUsedTo: !sound.isEnabledUsedTo,
    }));
    stopDBMetering(recording, setRecording);
    playSong();
  }

  async function playSong() {
    if (!sound.isEnabledUsedTo) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/soundtests/used-to.mp3")
      );

      resetVisualizer(setVisualizerParams);
      setCurrSound(sound);
      sound.playAsync();

      // Start the audio timer state
      startTimer(refCounter, setSeconds);
      startTimer(refWaveFormCounter, setWaveformTime);
    } else {
      currSound.unloadAsync() || undefined;
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
    }
    setLoadingSound(false);
  }

  return (
    <TouchableOpacity className="overall-sound1 items-center">
      <TouchableOpacity
        className={`${
          sound.isEnabledUsedTo && "bg-[#4AD0EE]"
        } w-[95%] rounded-xl`}
        onPress={
          isProMember ? enableUsedToTest : () => navigation.navigate("Paywall")
        }
      >
        <View
          className={`${
            sound.isEnabledUsedTo
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabledUsedTo ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              {loadingSound ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name={sound.isEnabledUsedTo ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              )}
            </View>
            <SoundTestWave
              currentTime={waveformTime}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              Bass Instrumental - Used To
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {minutes}:{seconds < 10 && "0"}
              {seconds} / 0:39
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
