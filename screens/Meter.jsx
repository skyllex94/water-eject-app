import { Text, SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect } from "react";

import RNSoundLevel from "react-native-sound-level";

// import { AudioRecorder, AudioUtils } from "react-native-audio";

export default function MeterScreen() {
  useEffect(() => {
    askPermissions();

    // let audioPath = AudioUtils.DocumentDirectoryPath + "/test.aac";

    // AudioRecorder.prepareRecordingAtPath(audioPath, {
    //   SampleRate: 22050,
    //   Channels: 1,
    //   AudioQuality: "Low",
    //   AudioEncoding: "aac",
    // });

    // AudioRecorder.onProgress = (data) => {
    //   console.log(data.currentMetering, data.currentPeakMetering);
    // };

    // RNSoundLevel.onNewFrame = (data) => console.log("Sound level info", data);

    // return () => RNSoundLevel.stop();
  }, []);

  async function askPermissions() {
    const permissionAnswer = await Audio.requestPermissionsAsync();
    console.log(permissionAnswer);
    return permissionAnswer;
    if (permissionAnswer.granted === true)
      RNSoundLevel.start({
        monitorInterval: MONITOR_INTERVAL,
        samplingRate: 16000, // default is 22050
      });
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle />
    </SafeAreaView>
  );
}
