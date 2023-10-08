import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

import { startTimer, stopTimer, stopWaveformTimer } from "../../util/Funcs";
import SoundTestWave from "../SoundTestWave";
import BassTestSound1 from "./BassTestSound1";
import BassTestSound2 from "./BassTestSound2";

export default function BassTest({ currSoundTest, setCurrSoundTest }) {
  const [isEnabledGoldLinkSong, setIsEnabledGoldLinkSong] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalTime = 69; // in seconds

  const refCounter = useRef();
  const refWaveFormCounter = useRef();

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <Text className="text-white ml-3 m-5">Bass Accuracy</Text>

      <BassTestSound1
        currSoundTest={currSoundTest}
        setCurrSoundTest={setCurrSoundTest}
      />

      <BassTestSound2
        currSoundTest={currSoundTest}
        setCurrSoundTest={setCurrSoundTest}
      />
    </View>
  );
}
