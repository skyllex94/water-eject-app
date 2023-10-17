import { View, FlatList, Image, useWindowDimensions } from "react-native";
import React from "react";
import slides from "../components/util/Slides";
import InstuctionsItem from "../components/InstuctionsSlides/InstuctionsItem";

export default function Instuctions() {
  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={slides}
        renderItem={(item) => <InstuctionsItem item={item} />}
      />
    </View>
  );
}
