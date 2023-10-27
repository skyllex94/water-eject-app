import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  openPurchaseModal,
  resetVisualizer,
  startTimer,
  stopTimer,
  stopWaveformTimer,
} from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { useContext } from "react";
import { Context } from "../../../contexts/Context";
import useRevenueCat from "../../../hooks/useRevenueCat";

export default function BassTestSound2({ navigation }) {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);
  const { isProMember } = useRevenueCat();
  const [loadingSound, setLoadingSound] = useState();

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 46; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (!sound.isEnabled151Rum || (minutes === 0 && seconds === totalTime)) {
      setMinutes(0);
      setSeconds(0);
      setWaveformTime(0);
      stopTimer(refCounter, setSeconds, setMinutes);
      stopWaveformTimer(refWaveFormCounter, setWaveformTime);
      setSound((state) => ({ ...state, isEnabled151Rum: false }));
    }
  }, [seconds, waveformTime, sound.isEnabled151Rum]);

  async function enable151RumBass() {
    setLoadingSound(true);
    console.log("setLoadingSound:", setLoadingSound);
    setSound((state) => ({
      ...!state,
      isEnabled151Rum: !sound.isEnabled151Rum,
    }));

    playSong();
  }
  async function playSong() {
    if (!sound.isEnabled151Rum) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/soundtests/151-rum.mp3")
      );

      console.log("sound:", sound);
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
    <TouchableOpacity className="overall-sound2 items-center">
      <TouchableOpacity
        className={`${
          sound.isEnabled151Rum
            ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
            : "w-[95%] my-3"
        } `}
        onPress={
          isProMember ? enable151RumBass : () => openPurchaseModal(navigation)
        }
      >
        <View
          className={`${
            sound.isEnabled151Rum
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabled151Rum ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              {loadingSound ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name={sound.isEnabled151Rum ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              )}
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
