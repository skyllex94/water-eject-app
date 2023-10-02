import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SpeakersTest({ currSoundTest, setCurrSoundTest }) {
  const [isEnabledLeft, setIsEnabledLeft] = useState(false);
  const [isEnabledRight, setIsEnabledRight] = useState(false);
  const [isEnabledBoth, setIsEnabledBoth] = useState(false);

  async function enableRightSpeaker() {
    setIsEnabledLeft(false);
    setIsEnabledBoth(false);
    setIsEnabledRight((prev) => !prev);

    await playSpeaker();

    async function playSpeaker() {
      if (!isEnabledRight) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/right-speaker.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enableLeftSpeaker() {
    setIsEnabledRight(false);
    setIsEnabledBoth(false);
    setIsEnabledLeft((prev) => !prev);

    await playSpeaker();

    async function playSpeaker() {
      if (!isEnabledLeft) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/left-speaker.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enableBothSpeakers() {
    setIsEnabledRight(false);
    setIsEnabledLeft(false);
    setIsEnabledBoth((prev) => !prev);

    await playSpeaker();

    async function playSpeaker() {
      if (!isEnabledBoth) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/both-speakers.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-white m-4">Front/Back Speakers</Text>

        <TouchableOpacity className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded">
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] justify-between mb-3">
        <TouchableOpacity onPress={enableRightSpeaker}>
          <View
            className={`${
              isEnabledRight ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledRight ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledRight ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Front Side</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={enableBothSpeakers}>
          <View
            className={`${
              isEnabledBoth ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                isEnabledBoth ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledBoth ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Both Sides</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={enableLeftSpeaker}>
          <View
            className={`${
              isEnabledLeft ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledLeft ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledLeft ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white mt-3">Back Side</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
