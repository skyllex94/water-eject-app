import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import { openPurchaseModal, resetVisualizer } from "../util/Funcs";

export default function PolarityTest({ navigation }) {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);
  const { isProMember } = useRevenueCat();

  async function enableInPhaseRumble() {
    setSound((state) => ({
      ...!state,
      isEnabledInPhaseRumble: !sound.isEnabledInPhaseRumble,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabledInPhaseRumble) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-rumble.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  async function enableOffPhaseRumble() {
    setSound((state) => ({
      ...!state,
      isEnabledOffPhaseRumble: !sound.isEnabledOffPhaseRumble,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabledOffPhaseRumble) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-rumble.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  async function enable75hzInPhase() {
    setSound((state) => ({
      ...!state,
      isEnabled75hzInPhase: !sound.isEnabled75hzInPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabled75hzInPhase) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-75hz.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  async function enable75hzOffPhase() {
    setSound((state) => ({
      ...!state,
      isEnabled75hzOffPhase: !sound.isEnabled75hzOffPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabled75hzOffPhase) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-75hz.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  async function enabledGuitarInPhase() {
    setSound((state) => ({
      ...!state,
      isEnabledGuitarInPhase: !sound.isEnabledGuitarInPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabledGuitarInPhase) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-guitar.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  async function enabledGuitarOffPhase() {
    setSound((state) => ({
      ...!state,
      isEnabledGuitarOffPhase: !sound.isEnabledGuitarOffPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!sound.isEnabledGuitarOffPhase) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-guitar.mp3"),
          {
            isLooping: true,
          }
        );

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  function openInfoModal() {
    navigation.navigate("PolarityInfo");
  }

  // TODO - see if you can optimize the structure and make in dynamically generated
  const testsInPhase = ["RumbleInPhase", "HzInPhase", "GuitarInPhase"];
  const testsOutPhase = ["RumbleOutPhase", "HzOutPhase", "GuitarOutPhase"];

  return (
    <View
      className={`${
        isProMember ? "bg-[#101C43]" : "bg-[#101C43]"
      }  justify-center rounded-xl mx-3 mt-4`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center m-5">
          {!isProMember && (
            <View className="mr-2">
              <FontAwesome5 name="lock" size={18} color="white" />
            </View>
          )}
          <Text className="text-white">Stereo Polarity</Text>
        </View>

        <TouchableOpacity
          onPress={openInfoModal}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="in-phase-group flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity
          onPress={
            isProMember
              ? enableInPhaseRumble
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledInPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledInPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledInPhaseRumble ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              Rumble {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="devider h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enable75hzInPhase
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabled75hzInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabled75hzInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabled75hzInPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              75 Hz Tone {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="devider h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enabledGuitarInPhase
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledGuitarInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 mr-3 p-2 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledGuitarInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledGuitarInPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              Guitar {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="off-phase-group flex-row bg-[#101C43] items-center justify-between mt-2 mb-3">
        <TouchableOpacity
          onPress={
            isProMember
              ? enableOffPhaseRumble
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledOffPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledOffPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledOffPhaseRumble ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              Rumble Out of Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enable75hzOffPhase
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabled75hzOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabled75hzOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabled75hzOffPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              75 Hz Out of Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enabledGuitarOffPhase
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledGuitarOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledGuitarOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledGuitarOffPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">
              Guitar Out of Phase
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
