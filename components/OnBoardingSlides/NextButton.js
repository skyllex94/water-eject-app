import { View, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { Circle, G } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

export default function NextButton({ percentage, slideForward }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef();
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#fff"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />

          <Circle
            ref={progressRef}
            stroke="#307283"
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>

      <TouchableOpacity
        onPress={slideForward}
        activeOpacity={0.6}
        className="absolute bg-[#8995ba] rounded-full p-6"
      >
        <AntDesign name="arrowright" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
