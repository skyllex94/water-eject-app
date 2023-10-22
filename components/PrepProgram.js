import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import { bgColor, buttonsColor, iconActiveColor } from "../styles/ColorsUI";

import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "./Context";
import { startTimer, stopTimer, stopWaveformTimer } from "./util/Funcs";
import useRevenueCat from "../hooks/useRevenueCat";
import SoundCloudWave from "./SoundCloudWave";
import { PlayerContext } from "../contexts/PlayerContext";

export default function PrepProgram({ navigation }) {
  const { isProMember } = useRevenueCat();
  const { setVisualizerParams } = useContext(Context);

  const { sound, setSound, currSound, setCurrSound } = useContext(Context);

  const defaultVisualizerParams = { speed: 500, frequency: 2, amplitude: 15 };

  const {
    secondsPrep,
    setSecondsPrep,
    minutesPrep,
    setMinutesPrep,
    waveformTimePrep,
    setWaveformTimePrep,
    currStatusPrep,
    setCurrStatusPrep,
  } = useContext(PlayerContext);

  const totalTime = 8 * 60 + 1; // in seconds

  const prepRefCounter = useRef();
  const prepRefWaveformCounter = useRef();

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsPrep > 59) {
      setMinutesPrep((prev) => prev + 1);
      setSecondsPrep(0);
    }
    if (!sound.isEnabledPrep || (minutesPrep === 8 && secondsPrep === 1)) {
      setMinutesPrep(0);
      setSecondsPrep(0);
      setWaveformTimePrep(0);
      stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
      stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
      setSound({ isEnabledPrep: false });

      if (currStatusPrep.status === "playing")
        setCurrStatusPrep({ status: "finished" });
    }

    // if (!sound.isEnabledPrep && minutesPrep === 0 && secondsPrep === 10)
  }, [secondsPrep, waveformTimePrep, sound.isEnabledPrep]);

  async function enablePrepFreq() {
    setSound((state) => ({ ...!state, isEnabledPrep: !sound.isEnabledPrep }));

    await playPrep();

    async function playPrep() {
      if (!sound.isEnabledPrep) {
        navigation.navigate("PlayingProgram");
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/programs/prep.mp3`),
          { isLooping: false }
        );

        setCurrSound(sound);
        await sound.playAsync();
        // Update Status bar UI to playing the current program
        setCurrStatusPrep({ status: "playing" });

        // Set Visualizer Preset Params
        setVisualizerParams({ speed: 75, frequency: 18, amplitude: 200 });

        // Start the audio timer state
        startTimer(prepRefCounter, setSecondsPrep);
        startTimer(prepRefWaveformCounter, setWaveformTimePrep);
      } else {
        currSound.unloadAsync() || undefined;
        setCurrStatusPrep({ status: "not-playing" });
        setVisualizerParams(defaultVisualizerParams);
        stopTimer(prepRefCounter, setSecondsPrep, setMinutesPrep);
        stopWaveformTimer(prepRefWaveformCounter, setWaveformTimePrep);
      }
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <TouchableOpacity>
      <TouchableOpacity
        // className={`bg-[${bgColor}] h-[120px] w-[95%] mx-3 p-3 rounded-2xl mt-4`}
        style={sound.isEnabledPrep ? styles.freqBtnActive : styles.freqBtn}
        onPress={isProMember ? enablePrepFreq : enablePrepFreq} // TO BE CHANGED BACK - openPurchaseModal
      >
        <View
          style={
            sound.isEnabledPrep
              ? styles.prepWaveformContainerActive
              : styles.prepWaveformContainer
          }
        >
          <View
            style={sound.isEnabledPrep ? styles.playActive : styles.prepPlay}
          >
            <Icon
              name={sound.isEnabledPrep ? "stop" : "play"}
              size={30}
              color="white"
            />
          </View>
          <View style={styles.waveformAll}>
            <SoundCloudWave
              currentTime={waveformTimePrep}
              totalTime={totalTime}
              waveform={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
            />
          </View>
        </View>

        <View style={styles.prepTextContainer}>
          <Text style={styles.freqText}>Speakers Prep Program</Text>
          <Text style={styles.prepTime}>
            {minutesPrep}:{secondsPrep < 10 && "0"}
            {secondsPrep} / 8:01
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lockedOption: {
    backgroundColor: "red",
  },

  freqBtn: {
    width: "95%",
    marginHorizontal: 10,
    height: 120,
    padding: 10,
    borderRadius: 15,
    backgroundColor: bgColor,
    marginTop: 16,
  },
  freqBtnActive: {
    width: "95%",
    marginHorizontal: 10,
    height: 120,
    padding: 10,
    borderRadius: 15,
    marginTop: 14,
    backgroundColor: "#4AD0EE",
  },

  prepWaveformContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: bgColor,
    padding: 10,
    borderRadius: 10,
  },
  prepWaveformContainerActive: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: iconActiveColor,
    padding: 10,
    borderRadius: 10,
  },

  waveformAll: {
    flexDirection: "row",
  },
  prepWaveform: {
    height: 40,
    width: 70,
  },
  prepPlay: {
    backgroundColor: buttonsColor,
    width: 50,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  playActive: {
    backgroundColor: iconActiveColor,
    width: 50,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  prepTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  freqText: {
    flexDirection: "row",
    paddingTop: 10,
    marginLeft: 5,
    fontWeight: 700,
    color: "white",
  },
  prepTime: {
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 5,
    fontWeight: 700,
    color: "white",
  },

  prepOnOffContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
