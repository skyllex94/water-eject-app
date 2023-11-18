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

export default function PrepProgram({ navigation }) {
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
    secondsPrep,
    setSecondsPrep,
    minutesPrep,
    setMinutesPrep,
    waveformTimePrep,
    setWaveformTimePrep,
    currStatus,
    setCurrStatus,
  } = useContext(PlayerContext);

  const totalTime = 481; // 8 * 60 + 1 in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsPrep > 59) {
      setMinutesPrep((prev) => prev + 1);
      setSecondsPrep(0);
    }
    if (!sound.isEnabledPrep || (minutesPrep === 8 && secondsPrep === 1)) {
      setMinutesPrep(0);
      setSecondsPrep(0);
      setWaveformTimePrep(0);
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
      setSound((state) => ({ ...state, isEnabledPrep: false }));

      if (currStatus.status === "playing")
        setCurrStatus({ status: "finished" });
    }
  }, [secondsPrep, waveformTimePrep, sound.isEnabledPrep]);

  async function enablePrepFreq() {
    setLoadingSound(true);
    setSound((state) => ({ ...!state, isEnabledPrep: !sound.isEnabledPrep }));
    stopDBMetering(recording, setRecording);

    await playPrep();
  }

  async function playPrep() {
    if (!sound.isEnabledPrep) {
      if (currSound) currSound.unloadAsync() || undefined;
      console.log("HERE AM I");
      await navigation.navigate("PlayingProgramPrep");
      const { sound, status } = await Audio.Sound.createAsync(
        require(`../../assets/programs/prep.mp3`),
        { isLooping: false }
      );

      // Start here: try to get the current time in milliseconds
      console.log(status);

      setCurrSound(sound);
      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      // Start the audio timer state
      startTimer(prepRefCounter, setSecondsPrep);
      startTimer(prepRefWaveformCounter, setWaveformTimePrep);

      sound.playAsync();
      activateKeepAwakeAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
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
          sound.isEnabledPrep ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4 `}
        onPress={isProMember ? enablePrepFreq : openPurchaseModal}
      >
        <View
          className={`${
            sound.isEnabledPrep ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledPrep
                ? `bg-[${iconActiveColor}]`
                : `bg-[${buttonsColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            {loadingSound ? (
              <ActivityIndicator />
            ) : (
              <Icon
                name={sound.isEnabledPrep ? "stop" : "play"}
                size={30}
                color="white"
              />
            )}
          </View>
          <View className="w-[95%]">
            <SoundCloudWave
              currentTime={waveformTimePrep}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
              // https://w1.sndcdn.com/PP3Eb34ToNki_m.png
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            1. Preparation Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {minutesPrep}:{secondsPrep < 10 && "0"}
            {secondsPrep} / 8:01
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
