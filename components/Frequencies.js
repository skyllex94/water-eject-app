import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Audio } from "expo-av";

import lowFreq from "../assets/icons/lowfreqIcon.png";
import medFreq from "../assets/icons/medfreqIcon.png";
import highFreq from "../assets/icons/highfreqIcon.png";
import xtHighFreq from "../assets/icons/xthighfreqIcon.png";
import { buttonsColor } from "../styles/ColorsUI";
import { Context } from "./Context";
import { useContext } from "react";

function Frequencies() {
  const {
    isEnabled120,
    setIsEnabled120,
    isEnabled160,
    setIsEnabled160,
    isEnabled300,
    setIsEnabled300,
    isEnabled500,
    setIsEnabled500,
    setIsEnabledPrep,
    setIsEnabledMain,
    currSound,
    setCurrSound,
    setVisualizerParams,
  } = useContext(Context);

  const defaultVisualizerParams = { speed: 500, frequency: 2, amplitude: 15 };

  async function isEnabled120hz() {
    setIsEnabled160(false);
    setIsEnabled300(false);
    setIsEnabled500(false);
    setIsEnabledPrep(false);
    setIsEnabledMain(false);
    setIsEnabled120((prev) => !prev);

    await startFrequency120(!isEnabled120);
  }

  async function startFrequency120(isEnabled) {
    if (isEnabled) {
      // Sound Visualizer paramethers change
      setVisualizerParams({ speed: 125, frequency: 5, amplitude: 105 });

      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/120hz.mp3`),
        { isLooping: true }
      );
      // Start or switch to current sound
      setCurrSound(sound);

      await sound.playAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
    }
  }

  async function isEnabled160hz() {
    setIsEnabled120(false);
    setIsEnabled300(false);
    setIsEnabled500(false);
    setIsEnabledPrep(false);
    setIsEnabledMain(false);
    setIsEnabled160((prev) => !prev);

    await startFrequency160(!isEnabled160);
  }

  async function startFrequency160(isEnabled) {
    if (isEnabled) {
      setVisualizerParams({ speed: 105, frequency: 8, amplitude: 155 });

      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/160hz.mp3`),
        { isLooping: true }
      );
      setCurrSound(sound);

      await sound.playAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
    }
  }

  async function isEnabled300hz() {
    setIsEnabled120(false);
    setIsEnabled160(false);
    setIsEnabled500(false);
    setIsEnabledPrep(false);
    setIsEnabledMain(false);
    setIsEnabled300((prev) => !prev);

    await startFrequency300(!isEnabled300);
  }

  async function startFrequency300(isEnabled) {
    if (isEnabled) {
      setVisualizerParams({ speed: 85, frequency: 12, amplitude: 175 });

      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/300hz.mp3`),
        { isLooping: true }
      );
      setCurrSound(sound);

      await sound.playAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams(defaultVisualizerParams);
    }
  }

  async function isEnabled500hz() {
    setIsEnabled120(false);
    setIsEnabled160(false);
    setIsEnabled300(false);
    setIsEnabledPrep(false);
    setIsEnabledMain(false);
    setIsEnabled500((prev) => !prev);

    await startFrequency500(!isEnabled500);
  }

  async function startFrequency500(isEnabled) {
    if (isEnabled) {
      setVisualizerParams({ speed: 75, frequency: 17, amplitude: 200 });

      if (currSound) currSound.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/500hz.mp3`),
        { isLooping: true }
      );
      setCurrSound(sound);

      await sound.playAsync();
    } else {
      currSound.unloadAsync() || undefined;
      setVisualizerParams({ speed: 500, frequency: 2, amplitude: 15 });
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.lowFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled120hz}
          style={isEnabled120 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={isEnabled120 ? styles.iconWrapperOn : styles.iconWrapper}
            >
              <Image style={styles.icon} source={lowFreq}></Image>
            </View>
            <Text style={styles.freqText}>120 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>{isEnabled120 ? "On" : "Off"}</Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={isEnabled120}
              onValueChange={isEnabled120hz}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isEnabled160hz}
          style={isEnabled160 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={isEnabled160 ? styles.iconWrapperOn : styles.iconWrapper}
            >
              <Image style={styles.icon} source={medFreq}></Image>
            </View>
            <Text style={styles.freqText}>160 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>{isEnabled160 ? "On" : "Off"}</Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={isEnabled160}
              onValueChange={isEnabled160hz}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.highFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled300hz}
          style={isEnabled300 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={isEnabled300 ? styles.iconWrapperOn : styles.iconWrapper}
            >
              <Image style={styles.icon} source={highFreq} />
            </View>
            <Text style={styles.freqText}>300 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>{isEnabled300 ? "On" : "Off"}</Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={isEnabled300}
              onValueChange={isEnabled300hz}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isEnabled500hz}
          style={isEnabled500 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={isEnabled500 ? styles.iconWrapperOn : styles.iconWrapper}
            >
              <Image style={styles.icon} source={xtHighFreq} />
            </View>
            <Text style={styles.freqText}>500 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>{isEnabled500 ? "On" : "Off"}</Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={isEnabled500}
              onValueChange={isEnabled500hz}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const bgColor = "#05103A";
const activeColor = "#4AD0EE";
const iconActiveColor = "#87e5fa";

const styles = StyleSheet.create({
  main: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
  },
  lowFreqOptions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  highFreqOptions: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "center",
  },
  freqBtn: {
    width: "45%",
    marginHorizontal: 7,
    height: 120,
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: buttonsColor,
  },
  freqBtnActive: {
    width: "45%",
    marginHorizontal: 7,
    height: 120,
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#4AD0EE",
  },
  freqIconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: bgColor,
  },
  iconWrapperOn: {
    width: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: iconActiveColor,
  },
  icon: {
    width: 30,
    height: 30,
  },
  freqText: {
    color: "white",
    marginLeft: 10,
    fontWeight: 700,
  },
  freqOnOff: {
    marginLeft: 5,
    flexDirection: "row",
    alignContent: "center",
    fontWeight: 700,
    color: "white",
  },
  freqControlText: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Frequencies;
