import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ImagingTest({
  currSoundTest,
  setCurrSoundTest,
  navigation,
}) {
  const [isEnabledOver, setIsEnabledOver] = useState(false);
  const [isEnabledLateral, setIsEnabledLateral] = useState(false);
  const [isEnabledBehind, setIsEnabledBehind] = useState(false);

  async function enableOverTest() {
    setIsEnabledBehind(false);
    setIsEnabledLateral(false);
    setIsEnabledOver((prev) => !prev);

    await playTest();

    async function playTest() {
      if (!isEnabledOver) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/over.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enableLateral() {
    setIsEnabledOver(false);
    setIsEnabledBehind(false);
    setIsEnabledLateral((prev) => !prev);

    await playTest();

    async function playTest() {
      if (!isEnabledLateral) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/lateral.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enableBehind() {
    setIsEnabledOver(false);
    setIsEnabledLateral(false);
    setIsEnabledBehind((prev) => !prev);

    await playTest();

    async function playTest() {
      if (!isEnabledBehind) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/behind.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  function openImagingModal() {
    navigation.navigate("ImagingInfo");
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 my-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-white m-5">Stereo Imaging</Text>

        <TouchableOpacity
          onPress={openImagingModal}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity onPress={enableOverTest}>
          <View
            className={`${
              isEnabledOver ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledOver ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledOver ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Arc Over</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enableLateral}>
          <View
            className={`${
              isEnabledLateral ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                isEnabledLateral ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledLateral ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Lateral</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enableBehind}>
          <View
            className={`${
              isEnabledBehind ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledBehind ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledBehind ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Behind</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
