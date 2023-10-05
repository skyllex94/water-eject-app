import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function PolarityInfo({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5 ">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">
          Polarity (Phase) Sound Test
        </Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white mb-2">
        A sound wave is a series of positive and negative pressure changes. Look
        at this sound wave on a graph. The center line represents normal air
        pressure in the room. As the line goes above the center line, there is a
        positive change in air pressure. As the line goes below the center line,
        there is a negative change in air pressure.
      </Text>

      <Image
        style={{ height: 200, width: "100%" }}
        source={require("../../assets/images/polarity.jpg")}
      />

      <Text className="text-white my-2">
        If the polarity of this wave is reversed, the positive periods will
        become negative and the negative periods will become positive. This is
        what the same wave would look like with polarity inverted:
      </Text>

      <Image
        style={{ height: 200, width: "100%" }}
        source={require("../../assets/images/inverted-polarity.jpg")}
      />

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2 "></View>

        <Text className="text-white  font-light mx-2">
          The sound "in phase" should sound a lot better than the one in which
          you have the reversed polarity, meaning the respective sound that is
          "out of phase."
        </Text>
      </View>
    </View>
  );
}
