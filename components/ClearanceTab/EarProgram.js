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
    secondsEar,
    setSecondsEar,
    minutesEar,
    setMinutesEar,
    waveformTimeEar,
    setWaveformTimeEar,
    currStatus,
    setCurrStatus,
  } = useContext(PlayerContext);

  const totalTime = 4 * 60 + 41; // 8 * 60 + 1 in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsEar > 59) {
      setMinutesEar((prev) => prev + 1);
      setSecondsEar(0);
    }
    if (!sound.isEnabledEar || (minutesEar === 4 && secondsEar === 41)) {
      setMinutesEar(0);
      setSecondsEar(0);
      setWaveformTimeEar(0);
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsEar, setMinutesEar);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimeEar);
      setSound((state) => ({ ...state, isEnabledEar: false }));

      if (currStatus.status === "playing")
        setCurrStatus({ status: "finished" });
    }
  }, [secondsEar, waveformTimeEar, sound.isEnabledEar]);

  async function enableEarFreq() {
    setLoadingSound(true);
    setSound((state) => ({ ...!state, isEnabledEar: !sound.isEnabledEar }));
    stopDBMetering(recording, setRecording);

    await playEarpieceProgram();
  }

  async function playEarpieceProgram() {
    if (!sound.isEnabledEar) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramEar");
      const { sound } = await Audio.Sound.createAsync(
        require(`../../assets/programs/ear.mp3`),
        { isLooping: false }
      );

      setCurrSound(sound);
      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      // Start the audio timer state
      startTimer(prepRefCounter, setSecondsEar);
      startTimer(prepRefWaveformCounter, setWaveformTimeEar);

      sound.playAsync();
      activateKeepAwakeAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsEar, setMinutesEar);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimeEar);
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
          sound.isEnabledEar ? `bg-[${activeColor}]` : `bg-[${buttonsColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4 `}
        onPress={isProMember ? enableEarFreq : openPurchaseModal}
      >
        <View
          className={`${
            sound.isEnabledEar
              ? `bg-[${iconActiveColor}]`
              : `bg-[${buttonsColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledEar ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            {loadingSound ? (
              <ActivityIndicator />
            ) : (
              <Icon
                name={sound.isEnabledEar ? "stop" : "play"}
                size={30}
                color="white"
              />
            )}
          </View>
          <View className="w-[95%]">
            <SoundCloudWave
              currentTime={waveformTimeEar}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
              // https://w1.sndcdn.com/PP3Eb34ToNki_m.png
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            Booming Earpiece Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {minutesEar}:{secondsEar < 10 && "0"}
            {secondsEar} / 4:41
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
