import { Text, SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect, useState, useContext } from "react";
import DecibelControls from "../components/MeterTab/DecibelControls";

// Decibel Level imports
import { AudioRecorder, AudioUtils } from "react-native-audio";
import { Alert } from "react-native";
import { Context } from "../components/Context";
let audioPath = AudioUtils.CachesDirectoryPath + "/test.aac";

export default function MeterScreen() {
  const { currDecibels, setCurrDecibels, isOnMetering, setIsOnMetering } =
    useContext(Context);

  useEffect(() => {
    askForMicPermission();
  }, []);

  async function askForMicPermission() {
    const permissionAnswer = await Audio.requestPermissionsAsync();
    console.log(permissionAnswer);
  }

  async function startDecibelMetering() {
    const auth = await AudioRecorder.checkAuthorizationStatus();
    if (auth === "granted") {
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        MeteringEnabled: true,
        MeasurementMode: true,
      });

      await AudioRecorder.startRecording();

      AudioRecorder.onProgress = (data) => {
        setCurrDecibels(Math.round(data.currentMetering) + 100);
      };
    } else {
      Alert.alert(`Permissions were not granted to use the Decibel Meter.`);
      await Audio.requestPermissionsAsync();
    }
  }

  async function stopDecibelMetering() {
    await AudioRecorder.stopRecording();
    if (currDecibels < 0) setCurrDecibels(0);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle currDecibels={currDecibels} />
      <DecibelControls
        startDecibelMetering={startDecibelMetering}
        stopDecibelMetering={stopDecibelMetering}
        setCurrDecibels={setCurrDecibels}
        isOnMetering={isOnMetering}
        setIsOnMetering={setIsOnMetering}
      />
    </SafeAreaView>
  );
}
