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
import { stopDBMetering } from "../Utils/Funcs";
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
  const { currTimePrep, setCurrTimePrep, setCurrStatus } =
    useContext(PlayerContext);

  const totalTime = 8 * 60 + 1;

  async function enablePrepFreq() {
    setLoadingSound(true);
    setSound((state) => ({ ...!state, isEnabledPrep: !sound.isEnabledPrep }));
    stopDBMetering(recording, setRecording);
    await playPrep();
  }

  async function playPrep() {
    if (!sound.isEnabledPrep) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramPrep");
      const { sound } = await Audio.Sound.createAsync(
        require(`../../assets/programs/prep.mp3`),
        { isLooping: false, progressUpdateIntervalMillis: 1000 },
        (status) => {
          if (!isNaN(status.durationMillis)) {
            setCurrTimePrep(Math.floor(status.positionMillis / 1000));
          }
        }
      );

      setCurrSound(sound);
      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      sound.playAsync();
      activateKeepAwakeAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      setCurrTimePrep(0);
      setCurrStatus({ status: "not-playing" });
      deactivateKeepAwake();
    }
    setLoadingSound(false);
  }

  return (
    <TouchableOpacity>
      <TouchableOpacity
        className={`${
          sound.isEnabledPrep ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4 `}
        onPress={
          isProMember ? enablePrepFreq : () => navigation.navigate("Paywall")
        }
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
              currentTime={currTimePrep}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/cWHNerOLlkUq_m.png"}
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            1. Preparation Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {Math.floor(currTimePrep / 60)}:{currTimePrep % 60 < 10 && "0"}
            {currTimePrep % 60} / {Math.floor(totalTime / 60)}:
            {totalTime % 60 < 10 && "0"}
            {totalTime % 60}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
