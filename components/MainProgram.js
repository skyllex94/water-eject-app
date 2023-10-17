import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context } from "./Context";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { bgColor, buttonsColor, iconActiveColor } from "../styles/ColorsUI";
import { startTimer, stopTimer, stopWaveformTimer } from "./util/Funcs";
import useRevenueCat from "../hooks/useRevenueCat";
import SoundCloudWave from "./SoundCloudWave";

export default function MainProgram({ navigation }) {
  const { sound, setSound, currSound, setCurrSound, setVisualizerParams } =
    useContext(Context);

  const { isProMember } = useRevenueCat();

  const defaultVisualizerParams = { speed: 500, frequency: 2, amplitude: 15 };

  const [secondsMain, setSecondsMain] = useState(0);
  const [minutesMain, setMinutesMain] = useState(0);
  const [waveformTime, setWaveformTime] = useState(0);
  const totalWaveformTime = 16 * 60 + 27;

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
      setWaveformTime(0);
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
      stopWaveformTimer(mainWaveformRefCounter, setWaveformTime);
    }
  }, [secondsMain, waveformTime, sound.isEnabledMain]);

  async function enableMainFreq() {
    setSound((state) => ({ ...!state, isEnabledMain: !sound.isEnabledMain }));
    await playMain();

    async function playMain() {
      if (!sound.isEnabledMain) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/programs/main.mp3`),
          { isLooping: false }
        );
        setCurrSound(sound);
        await sound.playAsync();
        setVisualizerParams({ speed: 75, frequency: 22, amplitude: 200 });

        startTimer(mainRefCounter, setSecondsMain);
        startTimer(mainWaveformRefCounter, setWaveformTime);
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams(defaultVisualizerParams);
        stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
        stopWaveformTimer(mainWaveformRefCounter, setWaveformTime);
      }
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <TouchableOpacity
      onPress={isProMember ? enableMainFreq : openPurchaseModal}
      style={sound.isEnabledMain ? styles.freqBtnActive : styles.freqBtn}
    >
      <View
        style={
          sound.isEnabledMain
            ? styles.prepWaveformContainerActive
            : styles.prepWaveformContainer
        }
      >
        <View style={sound.isEnabledMain ? styles.playActive : styles.prepPlay}>
          <Icon
            name={sound.isEnabledMain ? "stop" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View style={styles.waveformAll}>
          <SoundCloudWave
            currentTime={waveformTime}
            totalTime={totalWaveformTime}
            waveform={"https://w1.sndcdn.com/XwA2iPEIVF8z_m.png"}
          />
        </View>
      </View>

      <View style={styles.prepTextContainer}>
        <Text style={styles.freqText}>Water Clearance Program</Text>
        <Text style={styles.prepTime}>
          {minutesMain}:{secondsMain < 10 && "0"}
          {secondsMain} / 16:27
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "flex-start",
  },
  freqBtn: {
    width: "95%",
    marginHorizontal: 10,
    height: 120,
    padding: 10,
    borderRadius: 15,
    backgroundColor: bgColor,
    marginTop: 14,
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
