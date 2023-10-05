import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

export default function PolarityTest({
  currSoundTest,
  setCurrSoundTest,
  navigation,
}) {
  const [isEnabled75hzInPhase, setIsEnabled75hzInPhase] = useState(false);
  const [isEnabled75hzOffPhase, setIsEnabled75hzOffPhase] = useState(false);
  const [isEnabledInPhaseRumble, setIsEnabledInPhaseRumble] = useState(false);
  const [isEnabledOffPhaseRumble, setIsEnabledOffPhaseRumble] = useState(false);
  const [isEnabledGuitarInPhase, setIsEnabledGuitarInPhase] = useState(false);
  const [isEnabledGuitarOffPhase, setIsEnabledGuitarOffPhase] = useState(false);

  async function enableInPhaseRumble() {
    setIsEnabledOffPhaseRumble(false);
    setIsEnabled75hzInPhase(false);
    setIsEnabled75hzOffPhase(false);
    setIsEnabledGuitarInPhase(false);
    setIsEnabledGuitarOffPhase(false);
    setIsEnabledInPhaseRumble((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabledInPhaseRumble) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-rumble.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enableOffPhaseRumble() {
    setIsEnabledInPhaseRumble(false);
    setIsEnabled75hzInPhase(false);
    setIsEnabled75hzOffPhase(false);
    setIsEnabledGuitarInPhase(false);
    setIsEnabledGuitarOffPhase(false);
    setIsEnabledOffPhaseRumble((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabledOffPhaseRumble) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-rumble.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enable75hzInPhase() {
    setIsEnabledInPhaseRumble(false);
    setIsEnabledOffPhaseRumble(false);
    setIsEnabled75hzOffPhase(false);
    setIsEnabledGuitarInPhase(false);
    setIsEnabledGuitarOffPhase(false);
    setIsEnabled75hzInPhase((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabled75hzInPhase) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-75hz.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enable75hzOffPhase() {
    setIsEnabledInPhaseRumble(false);
    setIsEnabledOffPhaseRumble(false);
    setIsEnabled75hzInPhase(false);
    setIsEnabledGuitarInPhase(false);
    setIsEnabledGuitarOffPhase(false);
    setIsEnabled75hzOffPhase((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabled75hzOffPhase) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-75hz.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enabledGuitarInPhase() {
    setIsEnabledInPhaseRumble(false);
    setIsEnabledOffPhaseRumble(false);
    setIsEnabled75hzInPhase(false);
    setIsEnabled75hzOffPhase(false);
    setIsEnabledGuitarOffPhase(false);
    setIsEnabledGuitarInPhase((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabledGuitarInPhase) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/in-phase-guitar.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  async function enabledGuitarOffPhase() {
    setIsEnabledInPhaseRumble(false);
    setIsEnabledOffPhaseRumble(false);
    setIsEnabled75hzInPhase(false);
    setIsEnabled75hzOffPhase(false);
    setIsEnabledGuitarInPhase(false);
    setIsEnabledGuitarOffPhase((prev) => !prev);

    await playPolarity();

    async function playPolarity() {
      if (!isEnabledGuitarOffPhase) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/soundtests/off-phase-guitar.mp3"),
          {
            isLooping: true,
          }
        );

        setCurrSoundTest(sound);
        await sound.playAsync();
      } else currSoundTest.unloadAsync() || undefined;
    }
  }

  function openInfoModal() {
    navigation.navigate("PolarityInfo");
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-white m-5">Stereo Polarity</Text>

        <TouchableOpacity
          onPress={openInfoModal}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="in-phase-group flex-row bg-[#101C43] items-center justify-between mb-3">
        <TouchableOpacity onPress={enableInPhaseRumble}>
          <View
            className={`${
              isEnabledInPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledInPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledInPhaseRumble ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              Rumble {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="devider h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enable75hzInPhase}>
          <View
            className={`${
              isEnabled75hzInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                isEnabled75hzInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabled75hzInPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              75 Hz Tone {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="devider h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enabledGuitarInPhase}>
          <View
            className={`${
              isEnabledGuitarInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 mr-3 p-2 rounded-xl`}
          >
            <View
              className={`${
                isEnabledGuitarInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledGuitarInPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              Guitar {"\n"} In Phase
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="off-phase-group flex-row bg-[#101C43] items-center justify-between mt-2 mb-3">
        <TouchableOpacity onPress={enableOffPhaseRumble}>
          <View
            className={`${
              isEnabledOffPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledOffPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledOffPhaseRumble ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              Rumble {"\n"} Out of Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enable75hzOffPhase}>
          <View
            className={`${
              isEnabled75hzOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                isEnabled75hzOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabled75hzOffPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              75 Hz Tone Out of Phase
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-[75%] w-[1px] bg-[#05103A]" />

        <TouchableOpacity onPress={enabledGuitarOffPhase}>
          <View
            className={`${
              isEnabledGuitarOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                isEnabledGuitarOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={isEnabledGuitarOffPhase ? "pause" : "play"}
                size={30}
                color="white"
              />
            </View>

            <Text className="text-white text-center text-xs mt-3">
              Guitar {"\n"} Out of Phase
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
