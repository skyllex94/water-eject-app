import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function InfoFrequencies({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5 ">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">Helpful Frequencies</Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white font-extralight mb-2">
        After exposing your phone to water, the speakers and the sound from them
        becomes muggy and sometimes even gets almost completely blocked. Using
        specific frequencies to remove the water out of your speakers is the
        best way to restore your phone's speakers.
      </Text>

      <Text className="text-white font-extralight my-2">
        The water droplets stuck inside the speakers can be removed by using
        frequencies which are proven to produce results in gradually making the
        stuck droplets to go through the tiny mesh of the speakers. It is all
        caused by the rapid "shivering" from the chosen frequency.
      </Text>

      <Image
        className="rounded-xl"
        style={{ height: 200, width: "100%" }}
        source={require("../../assets/images/clearance/water-around.jpg")}
      />

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2 " />

        <Text className="text-white font-light mx-2">
          Play a lower frequency at first and after a couple of minutes, switch
          to a higher on, while you place your phone face down. {"\n"}
          For the best result, you need to use our DEDICATED ALTERNATING
          programs, below the frequencies.
        </Text>
      </View>
    </View>
  );
}
