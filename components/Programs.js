import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import prepWaveform from "../assets/waveforms/waveform.png";
import { activeColor, bgColor, buttonsColor } from "../styles/ColorsUI";

import Icon from "react-native-vector-icons/FontAwesome";

export default function Programs() {
  const [isEnabledPrep, setIsEnabledPrep] = useState(false);

  const [currProgram, setCurrProgram] = useState();

  async function enablePrepFreq() {
    setIsEnabledPrep((prev) => !prev);

    await playPrep(!isEnabledPrep);
  }

  async function playPrep(isEnabled) {
    if (isEnabled) {
      if (currProgram) currProgram.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/programs/prep.mp3`),
        { isLooping: false }
      );
      setCurrProgram(sound);

      console.log("Playing Program");
      await sound.playAsync();
    } else {
      console.log("Unloading Program");
      currProgram.unloadAsync() || undefined;
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={enablePrepFreq} style={styles.freqBtn}>
        <View style={styles.prepWaveformContainer}>
          <View style={styles.waveformAll}>
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
          </View>

          <Icon
            style={styles.prepPlay}
            name={isEnabledPrep ? "pause" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View style={styles.prepTextContainer}>
          <Text style={styles.freqText}>Speaker Preparation Frequency</Text>
          <Text style={styles.prepTime}>3:43 / 8:01</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={enablePrepFreq} style={styles.freqBtn}>
        <View style={styles.prepWaveformContainer}>
          <View style={styles.waveformAll}>
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
            <Image style={styles.prepWaveform} source={prepWaveform} />
          </View>

          <Icon
            style={styles.prepPlay}
            name={isEnabledPrep ? "pause" : "play"}
            size={30}
            color="white"
          />
        </View>

        <View style={styles.prepTextContainer}>
          <Text style={styles.freqText}>Water Ejection Dedicated Program</Text>
          <Text style={styles.prepTime}>3:43 / 23:00</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "flex-start",
    // backgroundColor: "green",
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

  prepWaveformContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: bgColor,
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
    borderRadius: 10,
    borderWidth: 1,
    color: "white",
    padding: 10,
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
    backgroundColor: bgColor,
  },

  prepOnOffContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
