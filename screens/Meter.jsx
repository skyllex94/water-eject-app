import { Text, SafeAreaView } from "react-native";
import React from "react";
import MorphingCircle from "../components/MorphingCircle";

export default function MeterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle />
    </SafeAreaView>
  );
}
