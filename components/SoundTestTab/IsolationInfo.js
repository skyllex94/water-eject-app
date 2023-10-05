import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function InfoIsolation({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5 ">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">Front / Back Sound Test</Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white">
        This is a simple stereo test which checks if your speakers are correctly
        associated with their respective channels.
      </Text>

      <Text className="mt-2 text-white italic font-light ">
        - "Stereophonic sound was pioneerd by Alan Dower Blumlein in 1931. Until
        then, people believed the ideal system consisted of an infinite number
        of microphones reproduced through an infinite number of speakers.
        Blumlein showed how two independent channels could be used to create the
        illusion of directionality. We only have two ears anyway..."
      </Text>

      <Text className="text-white my-2">
        By isolating each one of the front and respectively back speaker of your
        iPhone, you will be able to see if the muggy sound is coming from either
        one of them.
      </Text>

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2 "></View>

        <Text className="text-white font-light mx-2">
          Make sure you isolate each one of the speakers of your device and
          check and notice, if one side seems to be causing the problems. This
          way you will be better able to pinpoint what is the problem and
          troubleshoot is after playing the alternating frequency programs.
        </Text>
      </View>
    </View>
  );
}
