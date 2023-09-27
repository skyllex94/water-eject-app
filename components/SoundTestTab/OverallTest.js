import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import { bgColor, buttonsColor, iconActiveColor } from "../../styles/ColorsUI";

import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../Context";
import { startTimer, stopTimer, stopWaveformTimer } from "../util/Funcs";
import useRevenueCat from "../../hooks/useRevenueCat";
import SoundCloudWave from "../SoundCloudWave";
import SoundTestWave from "./SoundTestWave";

export default function OverallTest() {
  const { isProMember } = useRevenueCat();
  const { setVisualizerParams } = useContext(Context);

  const {
    setIsEnabled120,
    setIsEnabled160,
    setIsEnabled300,
    setIsEnabled500,
    isEnabledPrep,
    setIsEnabledPrep,
    setIsEnabledMain,
    currSound,
    setCurrSound,
  } = useContext(Context);

  const defaultVisualizerParams = { speed: 500, frequency: 2, amplitude: 15 };

  const [secondsPrep, setSecondsPrep] = useState(0);
  const [minutesPrep, setMinutesPrep] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 481; // in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsPrep > 59) {
      setMinutesPrep((prev) => prev + 1);
      setSecondsPrep(0);
    }
    if (!isEnabledPrep || (minutesPrep === 8 && secondsPrep === 1)) {
      setMinutesPrep(0);
      setSecondsPrep(0);
      setWaveformTime(0);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTime);
    }
  }, [secondsPrep, waveformTime, isEnabledPrep]);

  async function enablePrepFreq() {
    setIsEnabled120(false);
    setIsEnabled160(false);
    setIsEnabled300(false);
    setIsEnabled500(false);
    setIsEnabledMain(false);
    setIsEnabledPrep((prev) => !prev);
    await playPrep(!isEnabledPrep);
  }

  async function playPrep(isEnabled) {
    if (isEnabled) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../../assets/programs/prep.mp3`),
        { isLooping: false }
      );

      setCurrSound(sound);
      await sound.playAsync();

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      // Start the audio timer state
      startTimer(prepRefCounter, setSecondsPrep);
      startTimer(prepRefWaveformCounter, setWaveformTime);
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTime);
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-8">
      <Text className="text-white ml-3 mt-3">Test Overall Sound</Text>

      <TouchableOpacity className="sound1 items-center">
        <TouchableOpacity
          className={`${
            isEnabledPrep
              ? "w-[95%] bg-[#4AD0EE] py-3 my-3 rounded-xl"
              : "w-[95%] py-3 my-3"
          } `}
          onPress={enablePrepFreq}
        >
          <View
            className={`${
              isEnabledPrep
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
              <Text className="pt-2 ml-1 font-bold text-white">
                Speaker Preparation Frequency
              </Text>
              <Text className="pt-2 mr-1 font-bold text-white">
                {minutesPrep}:{secondsPrep < 10 && "0"}
                {secondsPrep} / 8:01
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity className="sound2 items-center">
        <TouchableOpacity
          className={`${
            isEnabledPrep
              ? "w-[95%] bg-[#4AD0EE] py-3 my-3 rounded-xl"
              : "w-[95%] py-3 my-3"
          } `}
          onPress={enablePrepFreq}
        >
          <View
            className={`${
              isEnabledPrep
                ? "bg-[#87E5FA] items-center justify-between p-2 rounded-xl border-white"
                : "bg-[#05103A] items-center justify-between p-2 rounded-xl border-white"
            }  `}
          >
            <View className="flex-row h-14 w-[100%]">
              <SoundCloudWave
                currentTime={waveformTime}
                totalTime={totalTime}
                waveform={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
              />
            </View>
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-1 font-bold text-white">
              Speaker Preparation Frequency
            </Text>
            <Text className="pt-2 mr-1 font-bold text-white">
              {minutesPrep}:{secondsPrep < 10 && "0"}
              {secondsPrep} / 8:01
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
