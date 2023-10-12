import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

import { Context } from "../Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import { openPurchaseModal } from "../util/Funcs";

export default function ImagingTest({ navigation }) {
  const { tests, setTests, currSoundTest, setCurrSoundTest } =
    useContext(Context);
  const { isProMember } = useRevenueCat();

  async function enableOverTest() {
    setTests((state) => ({ ...!state, isEnabledOver: !tests.isEnabledOver }));

    await playTest();

    async function playTest() {
      if (!tests.isEnabledOver) {
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
    setTests((state) => ({
      ...!state,
      isEnabledLateral: !tests.isEnabledLateral,
    }));

    console.log(tests);
    await playTest();

    async function playTest() {
      if (!tests.isEnabledLateral) {
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
    setTests((state) => ({
      ...!state,
      isEnabledBehind: !tests.isEnabledBehind,
    }));

    console.log(tests);

    await playTest();

    async function playTest() {
      if (!tests.isEnabledBehind) {
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
              tests.isEnabledOver ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledOver ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledOver ? "pause" : "play"}
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
              tests.isEnabledLateral ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledLateral ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledLateral ? "pause" : "play"}
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
              tests.isEnabledBehind ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledBehind ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledBehind ? "pause" : "play"}
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
