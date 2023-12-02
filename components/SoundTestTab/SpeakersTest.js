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

import { bgColor, buttonsColor } from "../../constants/ColorsUI";

export default function SpeakersTest({ navigation }) {
  // Test sound states
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

  async function enableSoundTest(item) {
    setSound((state) => ({ ...!state, [item.objName]: !sound[item.objName] }));
    stopDBMetering(recording, setRecording);
    playSound(item);
  }

  async function playSound(item) {
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

  const soundtest = [
    {
      name: "Ear Phone Speaker",
      objName: "isEnabledFront",
      file: require("../../assets/soundtests/right-speaker.mp3"),
    },
    {
      name: "Both Speakers",
      objName: "isEnabledBoth",
      file: require("../../assets/soundtests/both-speakers.mp3"),
    },
    {
      name: "Bottom Speaker",
      objName: "isEnabledBack",
      file: require("../../assets/soundtests/left-speaker.mp3"),
    },
  ];

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 my-2 pb-2">
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
          onPress={() => navigation.navigate("IsolationInfo")}
          className={`bg-[${bgColor}] items-center justify-center h-8 w-8 mr-3 rounded-md`}
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View
        className={`flex-row bg-[${buttonsColor}] items-center justify-between mb-2 mx-3`}
      >
        {soundtest.map((curr, idx) => (
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

                <Text className="text-white text-center mt-3">{curr.name}</Text>
              </View>
            </TouchableOpacity>

            {idx !== soundtest.length - 1 && (
              <View className="h-[75px] w-[1px] mx-4 bg-[#05103A]" />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
