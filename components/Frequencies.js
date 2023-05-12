import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";

function Frequencies() {
  const [isEnabled120, setIsEnabled120] = useState(false);
  const [isEnabled160, setIsEnabled160] = useState(false);
  const [isEnabled300, setIsEnabled300] = useState(false);
  const [isEnabled500, setIsEnabled500] = useState(false);

  const [currFreq, setCurrFreq] = useState();

  async function isEnabled120hz() {
    if (isEnabled160) setIsEnabled160(false);
    if (isEnabled300) setIsEnabled300(false);
    if (isEnabled500) setIsEnabled500(false);
    setIsEnabled120((prev) => !prev);

    await startFrequency120(!isEnabled120);
  }

  async function startFrequency120(isEnabled) {
    if (isEnabled) {
      if (currFreq) currFreq.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/120hz.mp3`),
        { isLooping: true }
      );
      setCurrFreq(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      currFreq.unloadAsync() || undefined;
    }
  }

  async function isEnabled160hz() {
    if (isEnabled120) setIsEnabled120(false);
    if (isEnabled300) setIsEnabled300(false);
    if (isEnabled500) setIsEnabled500(false);
    setIsEnabled160((prev) => !prev);

    await startFrequency160(!isEnabled160);
  }

  async function startFrequency160(isEnabled) {
    if (isEnabled) {
      if (currFreq) currFreq.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/160hz.mp3`),
        { isLooping: true }
      );
      setCurrFreq(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      currFreq.unloadAsync() || undefined;
    }
  }

  async function isEnabled300hz() {
    if (isEnabled120) setIsEnabled120(false);
    if (isEnabled160) setIsEnabled160(false);
    if (isEnabled500) setIsEnabled500(false);
    setIsEnabled300((prev) => !prev);

    await startFrequency300(!isEnabled300);
  }

  async function startFrequency300(isEnabled) {
    if (isEnabled) {
      if (currFreq) currFreq.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/300hz.mp3`),
        { isLooping: true }
      );
      setCurrFreq(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      currFreq.unloadAsync() || undefined;
    }
  }

  async function isEnabled500hz() {
    if (isEnabled120 === true) setIsEnabled120(false);
    if (isEnabled160 === true) setIsEnabled160(false);
    if (isEnabled300 === true) setIsEnabled300(false);
    setIsEnabled500((prev) => !prev);

    await startFrequency500(!isEnabled500);
  }

  async function startFrequency500(isEnabled) {
    if (isEnabled) {
      if (currFreq) currFreq.unloadAsync() || undefined;
      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/frequencies/500hz.mp3`),
        { isLooping: true }
      );
      setCurrFreq(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      currFreq.unloadAsync() || undefined;
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.lowFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled120hz}
          style={isEnabled120 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.iconWrapper}>
            <Icon name="rocket" size={30} color="white" />
          </View>

          <View style={styles.freqControlText}>
            <Text style={styles.freqText}>{isEnabled120 ? "Off" : "On"}</Text>
            <Switch
              trackColor={{ true: switchActiveColor }}
              value={isEnabled120}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isEnabled160hz}
          style={isEnabled160 ? styles.freqBtnActive : styles.freqBtn}
        >
          <Text style={styles.freqText}>{isEnabled160 ? "Stop" : "160Hz"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.highFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled300hz}
          style={isEnabled300 ? styles.freqBtnActive : styles.freqBtn}
        >
          <Text style={styles.freqText}>{isEnabled300 ? "Stop" : "300Hz"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isEnabled500hz}
          style={isEnabled500 ? styles.freqBtnActive : styles.freqBtn}
        >
          <Text style={styles.freqText}>{isEnabled500 ? "Stop" : "500Hz"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const bgColor = "#05103A";
const activeColor = "#4AD0EE";
const switchActiveColor = "#41bdd9";

const styles = StyleSheet.create({
  main: {
    flex: 4,
    flexDirection: "column",
    paddingTop: 10,
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
    backgroundColor: "#101C43",
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
  freqText: {
    marginLeft: 5,
    flexDirection: "row",
    alignContent: "center",
    fontWeight: 700,
    color: "white",
  },
  freqControlText: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    width: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: bgColor,
    marginBottom: 10,
  },
});

export default Frequencies;
