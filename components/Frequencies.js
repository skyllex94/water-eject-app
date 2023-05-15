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
