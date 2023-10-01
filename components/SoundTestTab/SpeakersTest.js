import { View, Text } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

export default function SpeakersTest() {
  const [isEnabledLeft, setIsEnabledLeft] = useState(false);
  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <Text className="text-white ml-3 my-3">Left/Right Speakers</Text>
      <View className="flex-row bg-[#101C43] justify-between mb-3">
        <View
          className={`${
            isEnabledLeft ? "bg-[#87e5fa]" : "bg-[#05103A]"
          } items-center justify-center w-24 h-12 ml-3 rounded-xl`}
        >
          <Icon
            name={isEnabledLeft ? "stop" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View
          className={`${
            isEnabledLeft ? "bg-[#87e5fa]" : "bg-[#05103A]"
          } items-center justify-center w-24 h-12 ml-3 rounded-xl`}
        >
          <Icon
            name={isEnabledLeft ? "stop" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View
          className={`${
            isEnabledLeft ? "bg-[#87e5fa]" : "bg-[#05103A]"
          } items-center justify-center w-24 h-12 ml-3 rounded-xl`}
        >
          <Icon
            name={isEnabledLeft ? "stop" : "play"}
            size={30}
            color="white"
          />
        </View>
      </View>
    </View>
  );
}
