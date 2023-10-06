import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../Context";

export default function SpeakersTest({
  currSoundTest,
  setCurrSoundTest,
  navigation,
}) {
  const { tests, setTests } = useContext(Context);

  async function enableFrontSpeaker() {
    setTests((state) => ({ ...!state, isEnabledFront: !tests.isEnabledFront }));

    await playSpeaker();

    async function playSpeaker() {
      if (!tests.isEnabledFront) {
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

  async function enableBackSpeaker() {
    setTests((state) => ({ ...!state, isEnabledBack: !tests.isEnabledBack }));

    await playSpeaker();

    async function playSpeaker() {
      if (!tests.isEnabledBack) {
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
    setTests((state) => ({ ...!state, isEnabledBoth: !tests.isEnabledBoth }));

    await playSpeaker();

    async function playSpeaker() {
      if (!tests.isEnabledBoth) {
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

  const openSpeakerIsolationInfo = () => {
    navigation.navigate("IsolationInfo");
  };

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-white m-5">Speaker Isolation</Text>

        <TouchableOpacity
          onPress={openSpeakerIsolationInfo}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity onPress={enableFrontSpeaker}>
          <View
            className={`${
              tests.isEnabledFront ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledFront ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledFront ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Front Speaker</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enableBothSpeakers}>
          <View
            className={`${
              tests.isEnabledBoth ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledBoth ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledBoth ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Both Sides</Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enableBackSpeaker}>
          <View
            className={`${
              tests.isEnabledBack ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledBack ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledBack ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-xs mt-3">Back Speaker</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
