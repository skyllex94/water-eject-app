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
  const {
    setIsEnabled120,
    setIsEnabled160,
    setIsEnabled300,
    setIsEnabled500,
    setIsEnabledPrep,
    isEnabledMain,
    setIsEnabledMain,
    currSound,
    setCurrSound,
  } = useContext(Context);

  const { isProMember } = useRevenueCat();

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

    if (!isEnabledMain || (minutesMain === 16 && secondsMain === 27)) {
      setMinutesMain(0);
      setSecondsMain(0);
      setWaveformTime(0);
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
      stopWaveformTimer(mainWaveformRefCounter, setWaveformTime);
    }
  }, [secondsMain, waveformTime, isEnabledMain]);

  async function enableMainFreq() {
    setIsEnabled120(false);
    setIsEnabled160(false);
    setIsEnabled300(false);
    setIsEnabled500(false);
    setIsEnabledPrep(false);
    setIsEnabledMain((prev) => !prev);

    await playMain(!isEnabledMain);
  }

  async function playMain(isEnabled) {
    if (isEnabled) {
      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/programs/main.mp3`),
        { isLooping: false }
      );
      setCurrSound(sound);
      await sound.playAsync();
      startTimer(mainRefCounter, setSecondsMain);
      startTimer(mainWaveformRefCounter, setWaveformTime);
    } else {
      currSound.unloadAsync() || undefined;
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
      stopWaveformTimer(mainWaveformRefCounter, setWaveformTime);
    }
  }

  function openPurchaseModal() {
    navigation.navigate("Paywall");
  }

  return (
    <TouchableOpacity
      onPress={isProMember ? enableMainFreq : openPurchaseModal}
      style={isEnabledMain ? styles.freqBtnActive : styles.freqBtn}
    >
      <View
        style={
          isEnabledMain
            ? styles.prepWaveformContainerActive
            : styles.prepWaveformContainer
        }
      >
        <View style={isEnabledMain ? styles.playActive : styles.prepPlay}>
          <Icon
            name={isEnabledMain ? "stop" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View style={styles.waveformAll}>
          <SoundCloudWave
            currentTime={waveformTime}
            totalTime={totalWaveformTime}
          />
        </View>
      </View>

      <View style={styles.prepTextContainer}>
        <Text style={styles.freqText}>Water Ejection Dedicated Program</Text>
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
    backgroundColor: "#101C43",
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
