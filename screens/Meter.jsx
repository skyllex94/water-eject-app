import { Text, SafeAreaView } from "react-native";

import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect } from "react";

import RNSoundLevel from "react-native-sound-level";

export default function MeterScreen() {
  useEffect(() => {
    askPermissions();

    // RNSoundLevel.onNewFrame = (data) => console.log("Sound level info", data);

    // return () => RNSoundLevel.stop();
  }, []);

  async function askPermissions() {
    const permissionAnswer = await Audio.requestPermissionsAsync();
    console.log(permissionAnswer);
    return permissionAnswer;
    if (permissionAnswer.granted === true) RNSoundLevel.start();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle />
    </SafeAreaView>
  );
}
