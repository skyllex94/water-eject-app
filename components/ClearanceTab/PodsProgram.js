import React, { useContext, useState } from "react";
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
import { PlayerContext } from "../../contexts/PlayerContext";
import { programs, defaultVisualizerParams } from "../../constants/Constants";
import Waveform from "./Waveform";

export default function PodsProgram({ navigation }) {
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

  const { currTime, setCurrTime, progress, setProgress, setCurrStatus } =
    useContext(PlayerContext);

  const totalTime = 5 * 60 + 12;
  const waveform = [
    25, 27, 21, 30, 15, 27, 27, 28, 18, 24, 18, 22, 17, 31, 30, 31, 28, 20, 28,
    21, 31, 22, 32, 28, 20, 30, 22, 12, 23, 20, 29, 25, 13,
  ];

  async function unloadSound(sound, status) {
    sound.unloadAsync() || undefined;
    setSound((state) => ({ ...!state, isEnabledAirpods: false }));
    setVisualizerParams(defaultVisualizerParams);
    setCurrTime(0);
    setCurrStatus({ status });
    deactivateKeepAwake();
  }

  async function enableAirpods() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledAirpods: !sound.isEnabledAirpods,
    }));
    stopDBMetering(recording, setRecording);
    setCurrTime(0);
    setProgress(0);

    await playAirpodsProgram();
  }

  async function playAirpodsProgram() {
    if (!sound.isEnabledAirpods) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramAirpods");
      const { sound } = await Audio.Sound.createAsync(
        programs.airpods,
        { isLooping: false, progressUpdateIntervalMillis: 1000 },
        (status) => {
          if (!isNaN(status.durationMillis)) {
            setProgress(
              Math.floor((status.positionMillis / status.durationMillis) * 100)
            );
            setCurrTime(Math.floor(status.positionMillis / 1000));
          }
          if (status.didJustFinish) unloadSound(sound, "finished");
        }
      );

      setCurrSound(sound);
      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      // Set Visualizer Preset Params
      setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

      sound.playAsync();
      activateKeepAwakeAsync();
    } else unloadSound(currSound, "not-playing");
    setLoadingSound(false);
  }

  return (
    <TouchableOpacity
      className={`${
        sound.isEnabledAirpods ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
      } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4`}
      onPress={
        isProMember ? enableAirpods : () => navigation.navigate("Paywall")
      }
    >
      <View
        className={`${
          sound.isEnabledAirpods ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
        } flex-row items-center justify-between p-3 rounded-xl`}
      >
        <View
          className={`${
            sound.isEnabledAirpods
              ? `bg-[${iconActiveColor}]`
              : `bg-[${buttonsColor}]`
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
        <View className="w-[80%]">
          <Waveform
            waveform={waveform}
            progress={sound.isEnabledAirpods ? progress : 0}
          />
        </View>
      </View>

      <View className="flex-row pt-[10px] items-center justify-between">
        <Text className="text-white ml-2 font-bold">
          Dedicated Airpods Program
        </Text>
        <Text className="text-white mr-2 font-bold">
          {sound.isEnabledAirpods ? Math.floor(currTime / 60) : "0"}:
          {sound.isEnabledAirpods ? currTime % 60 < 10 && "0" : 0}
          {sound.isEnabledAirpods ? currTime % 60 : 0} /{" "}
          {Math.floor(totalTime / 60)}:{totalTime % 60 < 10 && "0"}
          {totalTime % 60}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
