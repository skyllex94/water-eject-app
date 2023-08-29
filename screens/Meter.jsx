import { Text, SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect } from "react";
import DecibelControls from "../components/MeterTab/DecibelControls";

// Decibel Level imports
import { AudioRecorder, AudioUtils } from "react-native-audio";
import { useState } from "react";
let audioPath = AudioUtils.DocumentDirectoryPath + "/test.aac";

export default function MeterScreen() {
  // Decibel State UI
  const [currDecibels, setCurrDecibels] = useState(0);

  useEffect(() => {
    askForMicPermission();

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      MeteringEnabled: true,
      MeasurementMode: true,
    });
  }, []);

  async function askForMicPermission() {
    const permissionAnswer = await Audio.requestPermissionsAsync();
    console.log(permissionAnswer);
  }

  async function startDecibelMetering() {
    await AudioRecorder.startRecording();

    AudioRecorder.onProgress = (data) => {
      setCurrDecibels(Math.trunc(data.currentMetering + 100));
    };
  }

  async function stopDecibelMetering() {
    await AudioRecorder.pauseRecording();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle currDecibels={currDecibels} />
      <DecibelControls
        startDecibelMetering={startDecibelMetering}
        stopDecibelMetering={stopDecibelMetering}
      />
    </SafeAreaView>
  );
}
