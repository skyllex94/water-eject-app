import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function AboutSection() {
  return (
    <View>
      <Text className="text-gray-500 uppercase ml-4">About</Text>
      <View className="items-center">
        <TouchableOpacity className="bg-[#101C43] justify-center mt-5 h-12 w-[95%] rounded-lg">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center ml-5">
              <View className="mr-2">
                <Octicons name="versions" size={24} color="white" />
              </View>
              <Text className="text-white text-lg">Version</Text>
            </View>
            <Text className="text-gray-400 text-md mr-2">1.1.7</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#101C43] justify-center mt-2 h-12 w-[95%] rounded-lg">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center ml-5">
              <View className="mr-2">
                <Ionicons name="build" size={24} color="white" />
              </View>
              <Text className="text-white text-lg">Build</Text>
            </View>
            <Text className="text-gray-400 text-md mr-2">8</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
