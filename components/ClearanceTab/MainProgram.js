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
import SoundCloudWave from "./SoundCloudWave";
import { PlayerContext } from "../../contexts/PlayerContext";
import { defaultVisualizerParams, programs } from "../../constants/Constants";

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

  const { currTimeMain, setCurrTimeMain, setCurrStatus } =
    useContext(PlayerContext);

  const totalTime = 8 * 60 + 6;

  async function unloadSound(sound, status) {
    sound.unloadAsync() || undefined;
    setSound((state) => ({ ...!state, isEnabledMain: false }));
    setVisualizerParams(defaultVisualizerParams);
    setCurrTimeMain(0);
    setCurrStatus({ status });
    deactivateKeepAwake();
  }

  async function enableMainFreq() {
    setLoadingSound(true);
    setSound((state) => ({ ...!state, isEnabledMain: !sound.isEnabledMain }));
    stopDBMetering(recording, setRecording);
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
            setCurrTimeMain(Math.floor(status.positionMillis / 1000));
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
    <View className="items-center justify-center">
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

          <View className="w-[95%]">
            <SoundCloudWave
              currentTime={currTimeMain}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            2. Water Clearance Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {Math.floor(currTimeMain / 60)}:{currTimeMain % 60 < 10 && "0"}
            {currTimeMain % 60} / {Math.floor(totalTime / 60)}:
            {totalTime % 60 < 10 && "0"}
            {totalTime % 60}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
