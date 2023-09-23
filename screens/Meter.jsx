import { Text, SafeAreaView, Alert, View } from "react-native";
import { Audio } from "expo-av";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect, useState } from "react";
import DecibelControls from "../components/MeterTab/DecibelControls";
import DecibelInfo from "../components/MeterTab/DecibelInfo";

// Decibel Level imports
import { AudioRecorder, AudioUtils } from "react-native-audio";
let audioPath = AudioUtils.CachesDirectoryPath + "/test.aac";

export default function MeterScreen() {
  // Decibel State UI
  const [currDecibels, setCurrDecibels] = useState(0);
  const [isOnMetering, setIsOnMetering] = useState(false);

  // Metering Options
  const [sampleRate, setSampleRate] = useState(22050);
  const [audioQuality, setAudioQuality] = useState("Low");
  const [audioEncodingBitRate, setAudioEncodingBitRate] = useState("32");

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
        SampleRate: sampleRate,
        Channels: 1,
        AudioQuality: audioQuality,
        AudioEncoding: "aac",
        MeteringEnabled: true,
        MeasurementMode: true,
        AudioEncodingBitRate: audioEncodingBitRate,
      });

      await AudioRecorder.startRecording();

      AudioRecorder.onProgress = async (data) => {
        setCurrDecibels(Math.round(data.currentMetering) + 100);
      };
    } else {
      Alert.alert(`Permissions were not granted to use the Decibel Meter.`);
      await Audio.requestPermissionsAsync();
    }
  }

  async function stopDecibelMetering() {
    await AudioRecorder.pauseRecording();
    if (currDecibels < 0) setCurrDecibels(0);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>

      <MorphingCircle currDecibels={currDecibels} />
      <View>
        <DecibelInfo
          sampleRate={sampleRate}
          setSampleRate={setSampleRate}
          audioQuality={audioQuality}
          setAudioQuality={setAudioQuality}
          audioEncodingBitRate={audioEncodingBitRate}
          setAudioEncodingBitRate={setAudioEncodingBitRate}
        />
        <DecibelControls
          startDecibelMetering={startDecibelMetering}
          stopDecibelMetering={stopDecibelMetering}
          isOnMetering={isOnMetering}
          setIsOnMetering={setIsOnMetering}
        />
      </View>
    </SafeAreaView>
  );
}
