import React, { useRef, useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { startTimer, stopTimer, stopWaveformTimer } from "../../util/Funcs";
import SoundTestWave from "../SoundTestWave";
import { Context } from "../../Context";

export default function OverallTestSong2({ currSoundTest, setCurrSoundTest }) {
  const { tests, setTests } = useContext(Context);

  // GoldLink States and Refs
  const [secsGL, setSecsGL] = useState(0);
  const [minsGL, setMinsGL] = useState(0);
  const [waveTimeGL, setWaveTimeGL] = useState(0);
  const totalTimeGL = 47;

  const refCounterGoldLink = useRef();
  const refWaveformCounterGoldLink = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (
      !tests.isEnabledGoldLinkSong ||
      (minsGL === 0 && secsGL === totalTimeGL)
    ) {
      stopTimer(refCounterGoldLink, setSecsGL, setMinsGL);
      stopWaveformTimer(refWaveformCounterGoldLink, setWaveTimeGL);
      setTests((state) => ({ ...state, isEnabledGoldLinkSong: false }));
    }
  }, [secsGL, waveTimeGL, tests.isEnabledGoldLinkSong]);

  async function enableGoldLinkSong() {
    setTests((state) => ({
      ...!state,
      isEnabledGoldLinkSong: !tests.isEnabledGoldLinkSong,
    }));

    await playSong();

    async function playSong() {
      if (!tests.isEnabledGoldLinkSong) {
        if (currSoundTest) currSoundTest.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/soundtests/goldlink.mp3")
        );

        setCurrSoundTest(sound);
        await sound.playAsync();

        // Start the audio timer state
        startTimer(refCounterGoldLink, setSecsGL);
        startTimer(refWaveformCounterGoldLink, setWaveTimeGL);
      } else {
        currSoundTest.unloadAsync() || undefined;
        stopTimer(refCounterGoldLink, setSecsGL, setMinsGL);
        stopWaveformTimer(refWaveformCounterGoldLink, setWaveTimeGL);
      }
    }
  }

  return (
    <TouchableOpacity className="overall-sound2 items-center">
      <TouchableOpacity
        className={`${
          tests.isEnabledGoldLinkSong
            ? "w-[95%] bg-[#4AD0EE] my-3 rounded-xl"
            : "w-[95%] my-3"
        } `}
        onPress={enableGoldLinkSong}
      >
        <View
          className={`${
            tests.isEnabledGoldLinkSong
              ? "bg-[#87E5FA] justify-between py-2 rounded-xl border-white"
              : "bg-[#05103A] justify-between py-2 rounded-xl border-white"
          }  `}
        >
          <View className="flex-row h-14">
            <View
              className={`${
                tests.isEnabledGoldLinkSong ? "bg-[#87e5fa]" : "bg-[#101C43]"
              } items-center justify-center w-12 h-12 ml-3 mt-1 rounded-xl`}
            >
              <Icon
                name={tests.isEnabledGoldLinkSong ? "stop" : "play"}
                size={30}
                color="white"
              />
            </View>
            <SoundTestWave
              currentTime={waveTimeGL}
              totalTime={totalTimeGL}
              waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
            />
          </View>

          <View className="flex-row justify-between">
            <Text className="pt-2 ml-3 font-bold text-white">
              GoldLink - Zulu Screams
            </Text>
            <Text className="pt-2 mr-3 font-bold text-white">
              {minsGL}:{secsGL < 10 && "0"}
              {secsGL} / 0:46
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
