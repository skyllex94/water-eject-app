import React from "react";
import { Text, View } from "react-native";

import OverallTestSong1 from "./OverallTestSong1";
import OverallTestSong2 from "./OverallTestSong2";

export default function OverallTest() {
  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3">
      <Text className="text-white m-5">Overall Sound</Text>

      <OverallTestSong1 />

      <OverallTestSong2 />
    </View>
  );
}
