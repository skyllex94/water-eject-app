import { View, Animated, useWindowDimensions } from "react-native";
import React from "react";

export default function Indicator({ data, scrollX }) {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row h-10">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 35, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            className={`bg-[#526fc6] h-[10px] rounded-xl mx-[8px]`}
            style={[{ width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}
