import React, { useRef, useEffect, useContext, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

import {
  bgColor,
  activeColor,
  buttonsColor,
  iconActiveColor,
} from "../../constants/ColorsUI";

import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../../contexts/Context";
import {
  startTimer,
  stopDBMetering,
  stopTimer,
  stopWaveformTimer,
} from "../Utils/Funcs";
import useRevenueCat from "../../hooks/useRevenueCat";
import SoundCloudWave from "./SoundCloudWave";
import { PlayerContext } from "../../contexts/PlayerContext";
import { defaultVisualizerParams } from "../../constants/Constants";

export default function EarProgram({ navigation }) {
  const { isProMember } = useRevenueCat();

  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);
  const [loadingSound, setLoadingSound] = useState(false);

  const {
    secondsAirpods,
    setSecondsAirpods,
    minutesAirpods,
    setMinutesAirpods,
    waveformTimeAirpods,
    setWaveformTimeAidpods,
    currStatus,
    setCurrStatus,
  } = useContext(PlayerContext);

  const totalTime = 5 * 60 + 12; // 8 * 60 + 1 in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsAirpods > 59) {
      setMinutesAirpods((prev) => prev + 1);
      setSecondsAirpods(0);
    }
    if (
      !sound.isEnabledAirpods ||
      (minutesAirpods === 5 && secondsAirpods === 12)
    ) {
      setMinutesAirpods(0);
      setSecondsAirpods(0);
      setWaveformTimeAidpods(0);
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsAirpods, setMinutesAirpods);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimeAidpods);
      setSound((state) => ({ ...state, isEnabledAirpods: false }));

      if (currStatus.status === "playing")
        setCurrStatus({ status: "finished" });
    }
  }, [secondsAirpods, waveformTimeAirpods, sound.isEnabledAirpods]);

  async function enableAirpods() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledAirpods: !sound.isEnabledAirpods,
    }));
    stopDBMetering(recording, setRecording);

    await playAirpodsProgram();
  }

  async function playAirpodsProgram() {
    if (!sound.isEnabledAirpods) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramAirpods");
      const { sound } = await Audio.Sound.createAsync(
        require(`../../assets/programs/airpods.mp3`),
        { isLooping: false }
      );

      setCurrSound(sound);
      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      // Start the audio timer state
      startTimer(prepRefCounter, setSecondsAirpods);
      startTimer(prepRefWaveformCounter, setWaveformTimeAidpods);

      sound.playAsync();
      activateKeepAwakeAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsAirpods, setMinutesAirpods);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimeAidpods);
      setCurrStatus({ status: "not-playing" });
      deactivateKeepAwake();
    }
    setLoadingSound(false);
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <TouchableOpacity>
      <TouchableOpacity
        className={`${
          sound.isEnabledAirpods
            ? `bg-[${activeColor}]`
            : `bg-[${buttonsColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4 `}
        onPress={isProMember ? enableAirpods : openPurchaseModal}
      >
        <View
          className={`${
            sound.isEnabledAirpods
              ? `bg-[${iconActiveColor}]`
              : `bg-[${buttonsColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledAirpods
                ? `bg-[${iconActiveColor}]`
                : `bg-[${bgColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            {loadingSound ? (
              <ActivityIndicator />
            ) : (
              <Icon
                name={sound.isEnabledAirpods ? "stop" : "play"}
                size={30}
                color="white"
              />
            )}
          </View>
          <View className="w-[95%]">
            <SoundCloudWave
              currentTime={waveformTimeAirpods}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
              // https://w1.sndcdn.com/PP3Eb34ToNki_m.png
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            Dedicated Airpods Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {minutesAirpods}:{secondsAirpods < 10 && "0"}
            {secondsAirpods} / 5:12
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
