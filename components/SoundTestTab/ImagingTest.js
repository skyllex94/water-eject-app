import React, { Fragment, useContext } from "react";
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

export default function ImagingTest({ navigation }) {
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
      name: "Arc Over",
      objName: "inEnabledOver",
      file: require("../../assets/soundtests/over.mp3"),
    },
    {
      name: "Lateral",
      objName: "inEnabledLateral",
      file: require("../../assets/soundtests/lateral.mp3"),
    },
    {
      name: "Behind",
      objName: "inEnabledBehind",
      file: require("../../assets/soundtests/behind.mp3"),
    },
  ];

  async function enableSoundTest(curr) {
    setSound((state) => ({
      ...!state,
      [curr.objName]: !sound[curr.objName],
    }));
    stopDBMetering(recording, setRecording);
    await playTest();

    async function playTest() {
      if (!sound[curr.objName]) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(curr.file, {
          isLooping: true,
        });

        resetVisualizer(setVisualizerParams);
        setCurrSound(sound);
        await sound.playAsync();
      } else currSound.unloadAsync() || undefined;
    }
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-2 mb-4 pb-3">
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
          onPress={() => navigation.navigate("ImagingInfo")}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row bg-[#101C43] items-center justify-between mx-3 pb-1">
        {soundtests.map((curr, idx) => (
          <Fragment key={idx}>
            <TouchableOpacity
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

                <Text className="text-white mt-3">{curr.name}</Text>
              </View>
            </TouchableOpacity>

            {idx !== soundtests.length - 1 && (
              <View className="h-[75%] w-[1px] bg-[#05103A]" />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
