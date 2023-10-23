import React, { useRef, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import {
  bgColor,
  activeColor,
  buttonsColor,
  iconActiveColor,
} from "../../constants/ColorsUI";

import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../../contexts/Context";
import { startTimer, stopTimer, stopWaveformTimer } from "../util/Funcs";
import useRevenueCat from "../../hooks/useRevenueCat";
import SoundCloudWave from "./SoundCloudWave";
import { PlayerContext } from "../../contexts/PlayerContext";
import { defaultVisualizerParams } from "../../constants/Constants";

export default function PrepProgram({ navigation }) {
  const { isProMember } = useRevenueCat();

  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);

  const {
    secondsPrep,
    setSecondsPrep,
    minutesPrep,
    setMinutesPrep,
    waveformTimePrep,
    setWaveformTimePrep,
    currStatus,
    setCurrStatus,
  } = useContext(PlayerContext);

  const totalTime = 5; // 8 * 60 + 1 in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsPrep > 59) {
      setMinutesPrep((prev) => prev + 1);
      setSecondsPrep(0);
    }
    if (!sound.isEnabledPrep || (minutesPrep === 0 && secondsPrep === 5)) {
      setMinutesPrep(0);
      setSecondsPrep(0);
      setWaveformTimePrep(0);
      setVisualizerParams(defaultVisualizerParams);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
      setSound((state) => ({ ...state, isEnabledPrep: false }));

      if (currStatus.status === "playing")
        setCurrStatus({ status: "finished" });
    }
  }, [secondsPrep, waveformTimePrep, sound.isEnabledPrep]);

  async function enablePrepFreq() {
    setSound((state) => ({ ...!state, isEnabledPrep: !sound.isEnabledPrep }));

    await playPrep();

    async function playPrep() {
      if (!sound.isEnabledPrep) {
        if (currSound) currSound.unloadAsync() || undefined;
        await navigation.navigate("PlayingProgramPrep");
        const { sound } = await Audio.Sound.createAsync(
          require(`../../assets/soundtests/in-phase-guitar.mp3`),
          { isLooping: false }
        );

        setCurrSound(sound);
        // Update Status bar UI to playing the current program
        setCurrStatus({ status: "playing" });

        // Set Visualizer Preset Params
        setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

        // Start the audio timer state
        startTimer(prepRefCounter, setSecondsPrep);
        startTimer(prepRefWaveformCounter, setWaveformTimePrep);

        sound.playAsync();
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams(defaultVisualizerParams);
        stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
        stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
        setCurrStatus({ status: "not-playing" });
      }
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <TouchableOpacity>
      <TouchableOpacity
        className={`${
          sound.isEnabledPrep ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
        } h-[125px] w-[95%] mx-[10px] p-[10px] rounded-2xl mt-4`}
        onPress={isProMember ? enablePrepFreq : enablePrepFreq} // TO BE CHANGED BACK - openPurchaseModal
      >
        <View
          className={`${
            sound.isEnabledPrep ? `bg-[${iconActiveColor}]` : `bg-[${bgColor}]`
          } flex-row items-center justify-between p-3 rounded-xl`}
        >
          <View
            className={`${
              sound.isEnabledPrep
                ? `bg-[${iconActiveColor}]`
                : `bg-[${buttonsColor}]`
            } items-center w-[50px] p-[10px] rounded-xl`}
          >
            <Icon
              name={sound.isEnabledPrep ? "stop" : "play"}
              size={30}
              color="white"
            />
          </View>
          <View className="w-[82%]">
            <SoundCloudWave
              currentTime={waveformTimePrep}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
            />
          </View>
        </View>

        <View className="flex-row pt-[10px] items-center justify-between">
          <Text className="text-white ml-2 font-bold">
            Speakers Prep Program
          </Text>
          <Text className="text-white mr-2 font-bold">
            {minutesPrep}:{secondsPrep < 10 && "0"}
            {secondsPrep} / 8:01
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}