import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function GeneralSection() {
  return (
    <View>
      <Text className="text-gray-500 uppercase ml-4">General</Text>
      <View className="items-center">
        <TouchableOpacity className="bg-[#162255] justify-center mt-5 h-12 w-[95%] rounded-lg">
          <View className="flex-row items-center ml-5">
            <View className="mr-2">
              <MaterialIcons name="privacy-tip" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">Privacy Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#162255] justify-center mt-2 h-12 w-[95%] rounded-lg">
          <View className="flex-row items-center ml-5">
            <View className="mr-2">
              <Entypo name="news" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">Terms of Use</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#162255] justify-center mt-2 mb-5 h-12 w-[95%] rounded-lg">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center ml-5">
              <View className="mr-2">
                <MaterialIcons name="email" size={24} color="white" />
              </View>
              <Text className="text-white text-lg">Support</Text>
            </View>
            <Text className="text-gray-400 text-md mr-2">
              kkanchev94@gmail.com
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
