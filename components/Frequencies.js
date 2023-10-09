import {
  View,
  Text,
  StyleSheet,
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
import { useContext, useEffect } from "react";

function Frequencies() {
  const { currSound, setCurrSound, setVisualizerParams, freq, setFreq } =
    useContext(Context);

  const defaultVisualizerParams = { speed: 500, frequency: 3, amplitude: 10 };

  useEffect(() => {
    playAudioInSilentMode();
  }, []);

  async function playAudioInSilentMode() {
    return await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }

  async function isEnabled120hz() {
    setFreq((state) => ({ ...!state, isEnabled120: !freq.isEnabled120 }));

    await startFrequency120();

    async function startFrequency120() {
      if (!freq.isEnabled120) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/frequencies/120hz_cut.mp3`),
          { isLooping: true, shouldPlay: true }
        );

        // Start or switch to current sound
        setCurrSound(sound);

        await sound.playAsync();
        // Sound Visualizer paramethers change
        setVisualizerParams({ speed: 125, frequency: 5, amplitude: 105 });
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams(defaultVisualizerParams);
      }
    }
  }

  async function isEnabled160hz() {
    setFreq((state) => ({ ...!state, isEnabled160: !freq.isEnabled160 }));

    await startFrequency160();

    async function startFrequency160() {
      if (!freq.isEnabled160) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/frequencies/160hz_cut.mp3`),
          { isLooping: true }
        );
        setCurrSound(sound);

        await sound.playAsync();
        setVisualizerParams({ speed: 105, frequency: 8, amplitude: 155 });
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams(defaultVisualizerParams);
      }
    }
  }

  async function isEnabled300hz() {
    setFreq((state) => ({ ...!state, isEnabled300: !freq.isEnabled300 }));

    await startFrequency300();

    async function startFrequency300() {
      if (!freq.isEnabled300) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/frequencies/300hz_cut.mp3`),
          { isLooping: true }
        );
        setCurrSound(sound);

        await sound.playAsync();
        setVisualizerParams({ speed: 85, frequency: 12, amplitude: 175 });
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams(defaultVisualizerParams);
      }
    }
  }

  async function enable500Hz() {
    setFreq((state) => ({ ...!state, isEnabled500: !freq.isEnabled500 }));

    await startFrequency500();

    async function startFrequency500() {
      if (!freq.isEnabled500) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          require(`../assets/frequencies/500hz_cut.mp3`),
          { isLooping: true }
        );
        setCurrSound(sound);

        await sound.playAsync();
        setVisualizerParams({ speed: 75, frequency: 17, amplitude: 200 });
      } else {
        currSound.unloadAsync() || undefined;
        setVisualizerParams({ speed: 500, frequency: 2, amplitude: 15 });
      }
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.lowFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled120hz}
          style={freq.isEnabled120 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={
                freq.isEnabled120 ? styles.iconWrapperOn : styles.iconWrapper
              }
            >
              <Image style={styles.icon} source={lowFreq}></Image>
            </View>
            <Text style={styles.freqText}>120 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>
              {freq.isEnabled120 ? "On" : "Off"}
            </Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={freq.isEnabled120}
              onValueChange={isEnabled120hz}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isEnabled160hz}
          style={freq.isEnabled160 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={
                freq.isEnabled160 ? styles.iconWrapperOn : styles.iconWrapper
              }
            >
              <Image style={styles.icon} source={medFreq}></Image>
            </View>
            <Text style={styles.freqText}>160 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>
              {freq.isEnabled160 ? "On" : "Off"}
            </Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={freq.isEnabled160}
              onValueChange={isEnabled160hz}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.highFreqOptions}>
        <TouchableOpacity
          onPress={isEnabled300hz}
          style={freq.isEnabled300 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={
                freq.isEnabled300 ? styles.iconWrapperOn : styles.iconWrapper
              }
            >
              <Image style={styles.icon} source={highFreq} />
            </View>
            <Text style={styles.freqText}>300 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>
              {freq.isEnabled300 ? "On" : "Off"}
            </Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={freq.isEnabled300}
              onValueChange={isEnabled300hz}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={enable500Hz}
          style={freq.isEnabled500 ? styles.freqBtnActive : styles.freqBtn}
        >
          <View style={styles.freqIconText}>
            <View
              style={
                freq.isEnabled500 ? styles.iconWrapperOn : styles.iconWrapper
              }
            >
              <Image style={styles.icon} source={xtHighFreq} />
            </View>
            <Text style={styles.freqText}>500 Hz</Text>
          </View>
          <View style={styles.freqControlText}>
            <Text style={styles.freqOnOff}>
              {freq.isEnabled500 ? "On" : "Off"}
            </Text>
            <Switch
              trackColor={{ true: iconActiveColor }}
              value={freq.isEnabled500}
              onValueChange={enable500Hz}
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
