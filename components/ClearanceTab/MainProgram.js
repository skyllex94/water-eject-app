import React, { useContext, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Context } from "../../contexts/Context";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  bgColor,
  activeColor,
  buttonsColor,
  iconActiveColor,
} from "../../constants/ColorsUI";
import { startTimer, stopTimer, stopWaveformTimer } from "../Utils/Funcs";
import useRevenueCat from "../../hooks/useRevenueCat";
import SoundCloudWave from "./SoundCloudWave";
import { PlayerContext } from "../../contexts/PlayerContext";
import { defaultVisualizerParams } from "../../constants/Constants";

export default function MainProgram({ navigation }) {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);

  const { isProMember } = useRevenueCat();

  const {
    secondsMain,
    setSecondsMain,
    minutesMain,
    setMinutesMain,
    waveformTimeMain,
    setWaveformTimeMain,
    currStatus,
    setCurrStatus,
  } = useContext(PlayerContext);

  const totalWaveformTime = 16 * 60 + 27; // 16 * 60 + 27 in seconds;

  const mainRefCounter = useRef();
  const mainWaveformRefCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsMain > 59) {
      setMinutesMain((prev) => prev + 1);
      setSecondsMain(0);
    }

    if (!sound.isEnabledMain || (minutesMain === 16 && secondsMain === 27)) {
      setMinutesMain(0);
      setSecondsMain(0);
      setWaveformTimeMain(0);
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
      stopWaveformTimer(mainWaveformRefCounter, setWaveformTimeMain);
      setSound((state) => ({ ...state, isEnabledMain: false }));

      if (currStatus.status === "playing")
        setCurrStatus({ status: "finished" });
    }
  }, [secondsMain, waveformTimeMain, sound.isEnabledMain]);

  async function enableMainFreq() {
    setSound((state) => ({ ...!state, isEnabledMain: !sound.isEnabledMain }));
    await playMain();
  }

  async function playMain() {
    if (!sound.isEnabledMain) {
      if (currSound) currSound.unloadAsync() || undefined;
      await navigation.navigate("PlayingProgramMain");
      const { sound, status } = await Audio.Sound.createAsync(
        require(`../../assets/programs/main.mp3`),
        { isLooping: false, progressUpdateIntervalMillis: 1000 },
        (status) => {
          // TODO: Try to get this to sync with the timer
          // return  setSecondsMain(status.positionMillis)
        }
      );

      setCurrSound(sound);

      // Update Status bar UI to playing the current program
      setCurrStatus({ status: "playing" });

      setVisualizerParams({ speed: 75, frequency: 22, amplitude: 200 });

      startTimer(mainRefCounter, setSecondsMain);
      startTimer(mainWaveformRefCounter, setWaveformTimeMain);

      sound.playAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
      stopWaveformTimer(mainWaveformRefCounter, setWaveformTimeMain);
      setCurrStatus({ status: "not-playing" });
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <View className="items-center justify-center">
      <TouchableOpacity
        className={`${
          sound.isEnabledMain ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4`}
        onPress={isProMember ? enableMainFreq : openPurchaseModal}
      >
        <View
          className={`${
            sound.isEnabledMain ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledMain
                ? `bg-[${iconActiveColor}]`
                : `bg-[${buttonsColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            <Icon
              name={sound.isEnabledMain ? "stop" : "play"}
              size={30}
              color="white"
            />
          </View>

          <View className="w-[82%]">
            <SoundCloudWave
              currentTime={waveformTimeMain}
              totalTime={totalWaveformTime}
              waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            Water Clearance Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {minutesMain}:{secondsMain < 10 && "0"}
            {secondsMain} / 16:27
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
