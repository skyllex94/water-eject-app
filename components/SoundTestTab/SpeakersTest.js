import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../../contexts/Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import { openPurchaseModal, resetVisualizer } from "../Utils/Funcs";

export default function SpeakersTest({ navigation }) {
  // Test sound states
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);
  const { isProMember } = useRevenueCat();

  async function enableFrontSpeaker() {
    setSound((state) => ({ ...!state, isEnabledFront: !sound.isEnabledFront }));

    playSpeaker();
  }

  async function playSpeaker() {
    if (!sound.isEnabledFront) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/soundtests/right-speaker.mp3"),
        {
          isLooping: true,
        }
      );

      resetVisualizer(setVisualizerParams);
      setCurrSound(sound);
      await sound.playAsync();
    } else currSound.unloadAsync() || undefined;
  }

  async function enableBackSpeaker() {
    setSound((state) => ({ ...!state, isEnabledBack: !sound.isEnabledBack }));

    playSpeaker();

    async function playSpeaker() {
      if (!sound.isEnabledBack) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/left-speaker.mp3"),
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

  async function enableBothSpeakers() {
    setSound((state) => ({ ...!state, isEnabledBoth: !sound.isEnabledBoth }));

    await playSpeaker();

    async function playSpeaker() {
      if (!sound.isEnabledBoth) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/both-speakers.mp3"),
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

  const openSpeakerIsolationInfo = () => {
    navigation.navigate("IsolationInfo");
  };

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center m-5">
          {isProMember ? null : (
            <View className="mr-2">
              <FontAwesome5 name="lock" size={16} color="white" />
            </View>
          )}

          <Text className="text-white">Speaker Isolation</Text>
        </View>

        <TouchableOpacity
          onPress={openSpeakerIsolationInfo}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity
          onPress={
            isProMember
              ? enableFrontSpeaker
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledFront ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledFront ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledFront ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">Front Speaker</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enableBothSpeakers
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledBoth ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledBoth ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledBoth ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">Both Speakers</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity
          onPress={
            isProMember
              ? enableBackSpeaker
              : () => openPurchaseModal(navigation)
          }
        >
          <View
            className={`${
              sound.isEnabledBack ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                sound.isEnabledBack ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={sound.isEnabledBack ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center mt-3">Back Speaker</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
