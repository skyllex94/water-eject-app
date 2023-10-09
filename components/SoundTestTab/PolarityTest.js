import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../Context";

export default function PolarityTest({ navigation }) {
  const { tests, setTests, currSoundTest, setCurrSoundTest } =
    useContext(Context);

  async function enableInPhaseRumble() {
    setTests((state) => ({
      ...!state,
      isEnabledInPhaseRumble: !tests.isEnabledInPhaseRumble,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabledInPhaseRumble) {
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
    setTests((state) => ({
      ...!state,
      isEnabledOffPhaseRumble: !tests.isEnabledOffPhaseRumble,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabledOffPhaseRumble) {
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
    setTests((state) => ({
      ...!state,
      isEnabled75hzInPhase: !tests.isEnabled75hzInPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabled75hzInPhase) {
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
    setTests((state) => ({
      ...!state,
      isEnabled75hzOffPhase: !tests.isEnabled75hzOffPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabled75hzOffPhase) {
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
    setTests((state) => ({
      ...!state,
      isEnabledGuitarInPhase: !tests.isEnabledGuitarInPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabledGuitarInPhase) {
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
    setTests((state) => ({
      ...!state,
      isEnabledGuitarOffPhase: !tests.isEnabledGuitarOffPhase,
    }));

    await playPolarity();

    async function playPolarity() {
      if (!tests.isEnabledGuitarOffPhase) {
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
              tests.isEnabledInPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledInPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledInPhaseRumble ? "pause" : "play"}
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

        <TouchableOpacity onPress={enable75hzInPhase}>
          <View
            className={`${
              tests.isEnabled75hzInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabled75hzInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabled75hzInPhase ? "pause" : "play"}
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

        <TouchableOpacity onPress={enabledGuitarInPhase}>
          <View
            className={`${
              tests.isEnabledGuitarInPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 mr-3 p-2 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledGuitarInPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledGuitarInPhase ? "pause" : "play"}
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
        <TouchableOpacity onPress={enableOffPhaseRumble}>
          <View
            className={`${
              tests.isEnabledOffPhaseRumble ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 ml-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledOffPhaseRumble ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledOffPhaseRumble ? "pause" : "play"}
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

        <TouchableOpacity onPress={enable75hzOffPhase}>
          <View
            className={`${
              tests.isEnabled75hzOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabled75hzOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabled75hzOffPhase ? "pause" : "play"}
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

        <TouchableOpacity onPress={enabledGuitarOffPhase}>
          <View
            className={`${
              tests.isEnabledGuitarOffPhase ? "bg-[#87e5fa]" : "bg-[#05103A]"
            } items-center justify-center w-24 p-2 mr-3 rounded-xl`}
          >
            <View
              className={`${
                tests.isEnabledGuitarOffPhase ? "bg-[#74daf1]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledGuitarOffPhase ? "pause" : "play"}
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
