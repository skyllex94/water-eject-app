import React, { useRef, useState, useEffect, useContext } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import {
  resetVisualizer,
  startTimer,
  stopDBMetering,
  stopTimer,
  stopWaveformTimer,
} from "../../Utils/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../../contexts/Context";

export default function OverallTestSong2() {
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);

  const [loadingSound, setLoadingSound] = useState(false);

  // GoldLink States and Refs
  const [secsGL, setSecsGL] = useState(0);
  const [minsGL, setMinsGL] = useState(0);
  const [waveTimeGL, setWaveTimeGL] = useState(0);
  const totalTimeGL = 45;

  const refCounterGoldLink = useRef();
  const refWaveformCounterGoldLink = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (
      !sound.isEnabledGoldLinkSong ||
      (minsGL === 0 && secsGL === totalTimeGL)
    ) {
      stopTimer(refCounterGoldLink, setSecsGL, setMinsGL);
      stopWaveformTimer(refWaveformCounterGoldLink, setWaveTimeGL);
      setSound((state) => ({ ...state, isEnabledGoldLinkSong: false }));
    }
  }, [secsGL, waveTimeGL, sound.isEnabledGoldLinkSong]);

  async function enableGoldLinkSong() {
    setLoadingSound(true);
    setSound((state) => ({
      ...!state,
      isEnabledGoldLinkSong: !sound.isEnabledGoldLinkSong,
    }));
    stopDBMetering(recording, setRecording);

    playSong();
  }

  async function playSong() {
    if (!sound.isEnabledGoldLinkSong) {
      if (currSound) currSound.pauseAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/soundtests/goldlink.mp3")
      );

      resetVisualizer(setVisualizerParams);
      setCurrSound(sound);
      sound.playAsync();

      // Start the audio timer state
      startTimer(refCounterGoldLink, setSecsGL);
      startTimer(refWaveformCounterGoldLink, setWaveTimeGL);
    } else {
      currSound.pauseAsync() || undefined;
      stopTimer(refCounterGoldLink, setSecsGL, setMinsGL);
      stopWaveformTimer(refWaveformCounterGoldLink, setWaveTimeGL);
    }
    setLoadingSound(false);
  }

  return (
    <TouchableOpacity className="overall-sound2 items-center">
      <TouchableOpacity
        className={`${
          sound.isEnabledGoldLinkSong
            ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
            : "w-[95%] my-3"
        } `}
        onPress={enableGoldLinkSong}
      >
        <View
          className={`${
            sound.isEnabledGoldLinkSong
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                sound.isEnabledGoldLinkSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              {loadingSound ? (
                <ActivityIndicator />
              ) : (
                <Icon
                  name={sound.isEnabledGoldLinkSong ? "stop" : "play"}
                  size={30}
                  color="white"
                />
              )}
            </View>
            <SoundTestWave
              currentTime={waveTimeGL}
              totalTime={totalTimeGL}
              waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              Overall Test 2 - Zulu
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {minsGL}:{secsGL < 10 && "0"}
              {secsGL} / 0:45
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
