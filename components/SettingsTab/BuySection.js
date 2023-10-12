import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BuySection() {
  return (
    <View className="items-center">
      <View className="bg-[#162255] justify-center my-5 h-12 w-[95%] rounded-lg">
        <View className="flex-row items-center ml-5">
          <View className="mr-2">
            <FontAwesome5 name="crown" size={24} color="white" />
          </View>
          <Text className="text-white text-lg">Buy Pro Version</Text>
        </View>
      </View>
    </View>
  );
}
