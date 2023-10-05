import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function ImagingInfo({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5 ">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">
          Imaging (LEDR) Stereo Test
        </Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white my-1">
        LEDR™ stands for Listening Environment Diagnostic Recording, a test to
        subjectively evaluate the accuracy of stereo image reproduction.
      </Text>

      <Text className="text-white my-1">
        In the eighties, psychoacousticians began researching what are called
        pinna transforms, the way in which the shape of the outer ear filters
        the incoming sounds and permits our brain to infer their location. By
        embedding the filtering characteristics of the pinna into the audio
        signal, sound can be moved around the listener's head from a single pair
        of loudspeakers.
      </Text>

      <Text className="text-white my-1">
        The LEDR test generates pinna-filtered audio that will literally float
        around your speakers, assuming your sound reproduction system is neutral
        enough to preserve the original signal characteristics.
      </Text>

      <Text className="text-white my-1">
        <Text className="font-bold">OVER </Text> - The sound should begin at one
        speaker and travel in a smooth arc to the other speaker, from left to
        right. The arc should be unbroken, smooth and symmetrical. The top of
        the rainbow should be as high as the Up signals.
      </Text>

      <Text className="text-white my-1">
        <Text className="font-bold">LATERAL </Text> - This signal tests for
        conventional left-to-right stereo imaging.
      </Text>

      <Text className="text-white my-1">
        <Text className="font-bold">BEHIND</Text> - This signal should move and
        sound coming from behind the left to behind the right.
      </Text>

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2"></View>

        <Text className="text-white font-light mx-2">
          If the speakers are well and without any water in them, you should be
          able to experience a clean sound transition from one speaker to the
          other with their approximate pattern creation as the sound transitions
          from one side to the other.
        </Text>
      </View>
    </View>
  );
}
