import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";

import { Entypo } from "@expo/vector-icons";
import OverallTest from "../components/SoundTestTab/OverallTest";

export default function SoundTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currSoundTest, setCurrSoundTest] = useState(null);

  async function playPauseController() {
    if (currSoundTest) setCurrSoundTest(currSoundTest.pauseAsync());
    else setCurrSoundTest(currSoundTest.playAsync());

    setIsPlaying(!isPlaying);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-xl text-center">Sound Test</Text>

      <OverallTest
        currSoundTest={currSoundTest}
        setCurrSoundTest={setCurrSoundTest}
      />

      <View className="flex-row relative items-center justify-center">
        <TouchableOpacity
          className="bg-[#1a2b68] items-center justify-center 
        rounded-l-full border-4 border-white h-20 w-36 mt-10 pr-10"
        >
          <Entypo name="controller-jump-to-start" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#38477f] items-center absolute z-10 
        justify-center top-5 rounded-full border-4 border-white border-solid h-28 w-28"
          activeOpacity={1}
          onPress={playPauseController}
        >
          {isPlaying ? (
            <Entypo name="controller-paus" size={60} color="white" />
          ) : (
            <Entypo name="controller-play" size={60} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1a2b68] items-center justify-center 
        rounded-r-full border-4 border-white h-20 w-36 mt-10 pl-10"
        >
          <Entypo name="controller-next" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
