import React, { useContext, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Context } from "../../contexts/Context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  bgColor,
  activeColor,
  buttonsColor,
  iconActiveColor,
} from "../../constants/ColorsUI";
import { stopDBMetering } from "../Utils/Funcs";
import useRevenueCat from "../../hooks/useRevenueCat";
import { PlayerContext } from "../../contexts/PlayerContext";
import { defaultVisualizerParams, programs } from "../../constants/Constants";
import Waveform from "./Waveform";

export default function MainProgram({ navigation }) {
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
  const { isProMember } = useRevenueCat();

  const { currTime, setCurrTime, progress, setProgress, setCurrStatus } =
    useContext(PlayerContext);

  const totalTime = 8 * 60 + 6;
  const waveform = [
    28, 23, 30, 32, 23, 23, 32, 24, 24, 30, 28, 28, 23, 20, 32, 24, 27, 18, 24,
    25, 31, 26, 30, 16, 21, 32, 30, 25, 21, 32, 32, 27, 26,
  ];

  async function unloadSound(sound, status) {
    sound.unloadAsync() || undefined;
    setSound((state) => ({ ...!state, isEnabledMain: false }));
    setVisualizerParams(defaultVisualizerParams);
    setCurrTime(0);
    setCurrStatus({ status });
    deactivateKeepAwake();
  }

  async function enableMainFreq() {
    setLoadingSound(true);
    setSound((state) => ({ ...!state, isEnabledMain: !sound.isEnabledMain }));
    stopDBMetering(recording, setRecording);
    setCurrTime(0);
    setProgress(0);
    await playMain();
  }

  async function playMain() {
    if (!sound.isEnabledMain) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramMain");
      const { sound } = await Audio.Sound.createAsync(
        programs.speakers[1],
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
      setVisualizerParams({ speed: 75, frequency: 22, amplitude: 200 });

      sound.playAsync();
      activateKeepAwakeAsync();
    } else unloadSound(currSound, "not-playing");
    setLoadingSound(false);
  }

  return (
    <View className="items-center justify-center ">
      <TouchableOpacity
        className={`${
          sound.isEnabledMain ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-3`}
        onPress={
          isProMember ? enableMainFreq : () => navigation.navigate("Paywall")
        }
      >
        <View
          className={`${
            sound.isEnabledMain ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledMain
                ? `bg-[${iconActiveColor}]`
                : `bg-[${buttonsColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            {loadingSound ? (
              <ActivityIndicator />
            ) : (
              <Icon
                name={sound.isEnabledMain ? "stop" : "play"}
                size={30}
                color="white"
              />
            )}
          </View>

          <View className="w-[80%]">
            <Waveform
              waveform={waveform}
              progress={sound.isEnabledMain ? progress : 0}
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            2. Water Clearance Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {sound.isEnabledMain ? Math.floor(currTime / 60) : "0"}:
            {sound.isEnabledMain ? currTime % 60 < 10 && "0" : 0}
            {sound.isEnabledMain ? currTime % 60 : 0} /{" "}
            {Math.floor(totalTime / 60)}:{totalTime % 60 < 10 && "0"}
            {totalTime % 60}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
