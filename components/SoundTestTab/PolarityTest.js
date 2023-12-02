import React, { useContext, Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../../contexts/Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import {
  openPurchaseModal,
  resetVisualizer,
  stopDBMetering,
} from "../Utils/Funcs";

export default function PolarityTest({ navigation }) {
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);
  const { isProMember } = useRevenueCat();

  const soundtests = [
    {
      name: "Rumble In Phase",
      objName: "isEnabledInPhaseRumble",
      file: require("../../assets/soundtests/in-phase-rumble.mp3"),
    },
    {
      name: "75 Hz Tone In Phase",
      objName: "isEnabled75hzInPhase",
      file: require("../../assets/soundtests/in-phase-75hz.mp3"),
    },
    {
      name: "Guitar In Phase",
      objName: "isEnabledGuitarInPhase",
      file: require("../../assets/soundtests/in-phase-guitar.mp3"),
    },
    {
      name: "Rumble Out of Phase",
      objName: "isEnabledOffPhaseRumble",
      file: require("../../assets/soundtests/off-phase-rumble.mp3"),
    },
    {
      name: "75 Hz Out of Phase",
      objName: "isEnabled75hzOffPhase",
      file: require("../../assets/soundtests/off-phase-75hz.mp3"),
    },
    {
      name: "Guitar Out of Phase",
      objName: "isEnabledGuitarOffPhase",
      file: require("../../assets/soundtests/off-phase-guitar.mp3"),
    },
  ];

  async function enableSoundTest(item) {
    setSound((state) => ({
      ...!state,
      [item.objName]: !sound[item.objName],
    }));
    stopDBMetering(recording, setRecording);
    await playPolarity();

    async function playPolarity() {
      if (!sound[item.objName]) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(item.file, {
          isLooping: true,
        });

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  return (
    <View
      className={`${
        isProMember ? "bg-[#101C43]" : "bg-[#101C43]"
      }  justify-center rounded-xl mx-3 my-2 pb-3`}
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
          onPress={() => navigation.navigate("PolarityInfo")}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap bg-[#101C43] items-center justify-between mx-3">
        {soundtests.map((curr, idx) => (
          <Fragment key={idx}>
            <TouchableOpacity
              className="mb-4"
              onPress={
                isProMember
                  ? () => enableSoundTest(curr)
                  : () => openPurchaseModal(navigation)
              }
            >
              <View
                className={`${
                  sound[curr.objName] ? "bg-[#87e5fa]" : "bg-[#05103A]"
                } items-center justify-center w-24 p-2 rounded-xl`}
              >
                <View
                  className={`${
                    sound[curr.objName] ? "bg-[#74daf1]" : "bg-[#101C43]"
                  } items-center justify-center w-12 h-12 mt-1 rounded-xl`}
                >
                  <Icon
                    name={sound[curr.objName] ? "pause" : "play"}
                    size={30}
                    color="white"
                  />
                </View>

                <Text className="text-white text-center mt-3">{curr.name}</Text>
              </View>
            </TouchableOpacity>

            {idx !== 2 && idx !== soundtests.length - 1 && (
              <View className="devider h-[30%] w-[1px] bg-[#05103A]" />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
