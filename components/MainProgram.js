import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context } from "./Context";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { bgColor, buttonsColor, iconActiveColor } from "../styles/ColorsUI";
import { startTimer, stopTimer } from "./util/Funcs";
import useRevenueCat from "../hooks/useRevenueCat";

export default function MainProgram() {
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
    navigationPaywall,
  } = useContext(Context);

  const { isProMember } = useRevenueCat();

  const [secondsMain, setSecondsMain] = useState(0);
  const [minutesMain, setMinutesMain] = useState(0);

  const mainRefCounter = useRef();

  const mainWaveParams = [
    15, 20, 24, 28, 30, 28, 28, 29, 25, 29, 29, 28, 26, 25, 23, 17, 10, 0, 0, 3,
    13, 23, 27, 28, 28, 26, 23, 22, 27, 28, 27, 26, 24, 22, 15, 9, 0, 0, 6, 15,
    23, 27, 27, 27, 28, 23, 23, 27, 28, 27, 26, 23, 23, 14, 6, 0, 0, 5, 18, 24,
    20, 21, 27, 24, 28, 24, 27, 28, 27, 28, 24, 23, 19,
  ];

  // Incrementing minutes for audio timers
  useEffect(() => {
    if (secondsMain > 59) {
      setMinutesMain((prev) => prev + 1);
      setSecondsMain(0);
    }

    if (!isEnabledMain || (minutesMain === 16 && secondsMain === 27)) {
      setMinutesMain(0);
      setSecondsMain(0);
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
    }
  }, [secondsMain, isEnabledMain]);

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
    } else {
      currSound.unloadAsync() || undefined;
      stopTimer(mainRefCounter, setSecondsMain, setMinutesMain);
    }
  }

  function openPurchaseModal() {
    navigationPaywall.navigate("Paywall");
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
        <View style={styles.waveformAll}>
          {mainWaveParams.map((wave, idx) => {
            return (
              <View key={idx} style={{ justifyContent: "flex-end" }}>
                <View
                  style={{
                    height: wave,
                    width: 3,
                    backgroundColor: "white",
                    marginLeft: 1,
                  }}
                />
              </View>
            );
          })}
        </View>

        <View style={isEnabledMain ? styles.playActive : styles.prepPlay}>
          <Icon
            name={isEnabledMain ? "stop" : "play"}
            size={30}
            color="white"
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
