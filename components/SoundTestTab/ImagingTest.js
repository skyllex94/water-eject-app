import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

import { Context } from "../../contexts/Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import { openPurchaseModal, resetVisualizer } from "../util/Funcs";

export default function ImagingTest({ navigation }) {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);
  const { isProMember } = useRevenueCat();

  async function enableOverTest() {
    setSound((state) => ({ ...!state, isEnabledOver: !sound.isEnabledOver }));

    await playTest();

    async function playTest() {
      if (!sound.isEnabledOver) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/over.mp3"),
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

  async function enableLateral() {
    setSound((state) => ({
      ...!state,
      isEnabledLateral: !sound.isEnabledLateral,
    }));

    await playTest();

    async function playTest() {
      if (!sound.isEnabledLateral) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/lateral.mp3"),
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

  async function enableBehind() {
    setSound((state) => ({
      ...!state,
      isEnabledBehind: !sound.isEnabledBehind,
    }));

    await playTest();

    async function playTest() {
      if (!sound.isEnabledBehind) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/behind.mp3"),
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

  function openImagingModal() {
    navigation.navigate("ImagingInfo");
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 my-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center m-5">
          {!isProMember && (
            <View className="mr-2">
              <FontAwesome5 name="lock" size={18} color="white" />
            </View>
          )}
          <Text className="text-white">Stereo Imaging</Text>
        </View>

        <TouchableOpacity
          onPress={openImagingModal}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity
          onPress={
            isProMember ? enableOverTest : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledOver ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledOver ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledOver ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Arc Over</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember ? enableLateral : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledLateral ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledLateral ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledLateral ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Lateral</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember ? enableBehind : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledBehind ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledBehind ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledBehind ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Behind</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
