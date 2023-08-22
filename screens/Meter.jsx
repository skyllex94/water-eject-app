import { Text, SafeAreaView } from "react-native";

import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect } from "react";

export default function MeterScreen() {
  useEffect(() => {
    askPermissions();
  }, []);

  async function askPermissions() {
    return await Audio.requestPermissionsAsync();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle />
    </SafeAreaView>
  );
}
