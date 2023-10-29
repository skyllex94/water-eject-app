import { Text, SafeAreaView, Alert, ScrollView } from "react-native";
import { Audio } from "expo-av";
import DecibelDisplay from "../components/MeterTab/DecibelDisplay";
import { useContext, useEffect, useState } from "react";
import DecibelControls from "../components/MeterTab/DecibelControls";
import DecibelInfo from "../components/MeterTab/DecibelInfo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";

// Decibel Level imports
import { AudioRecorder, AudioUtils } from "react-native-audio";
import { Context } from "../contexts/Context";
import { RecordingOptionsPresets } from "expo-av/build/Audio";
let audioPath = AudioUtils.CachesDirectoryPath + "/test.aac";

// React Native Navigator - Stack Navigator initializer
const Stack = createNativeStackNavigator();

export default function Meter() {
  return (
    <Stack.Navigator initialRouteName="MeterTab">
      <Stack.Screen
        name="MeterTab"
        component={MeterTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Paywall"
        component={Paywall}
        options={{
          presentation: "modal",
          tabBarLabel: "Paywall",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function MeterTab({ navigation }) {
  // Decibel State UI
  const [currDecibels, setCurrDecibels] = useState(30);

  // Metering Options
  const [sampleRate, setSampleRate] = useState(22050);
  const [audioQuality, setAudioQuality] = useState("Low");
  const [audioEncodingBitRate, setAudioEncodingBitRate] = useState("32");

  const { setSound, currSound } = useContext(Context);

  useEffect(() => {
    askForMicPermission();
  }, []);

  async function askForMicPermission() {
    const permissionAnswer = await Audio.requestPermissionsAsync();
    // console.log(permissionAnswer);
  }

  async function stopAnySound() {
    if (currSound) {
      setSound({});
      currSound.unloadAsync() || undefined;
    }
  }

  async function startDecibelMetering() {
    // await stopAnySound();
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

  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>

      <ScrollView>
        <DecibelDisplay currDecibels={currDecibels} />
        <DecibelInfo
          sampleRate={sampleRate}
          setSampleRate={setSampleRate}
          audioQuality={audioQuality}
          setAudioQuality={setAudioQuality}
          audioEncodingBitRate={audioEncodingBitRate}
          setAudioEncodingBitRate={setAudioEncodingBitRate}
        />
        <DecibelControls
          startDecibelMetering={startRecording}
          stopDecibelMetering={stopRecording}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
