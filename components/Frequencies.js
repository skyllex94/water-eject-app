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

// Decibel Metering Imports to be stopped when switching tabs
import { AudioRecorder } from "react-native-audio";

export default function Frequencies() {
  const { currSound, setCurrSound, setVisualizerParams, sound, setSound } =
    useContext(Context);

  const defaultVisualizerParams = { speed: 500, frequency: 3, amplitude: 10 };

  useEffect(() => {
    playAudioInSilentMode();
  }, []);

  function stopDecibelMeter() {
    AudioRecorder.stopRecording();
  }

  async function playAudioInSilentMode() {
    return await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }

  async function isEnabled120hz() {
    setSound((state) => ({ ...!state, isEnabled120: !sound.isEnabled120 }));

    stopDecibelMeter();
    await startFrequency120();

    async function startFrequency120() {
      if (!sound.isEnabled120) {
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
    setSound((state) => ({ ...!state, isEnabled160: !sound.isEnabled160 }));

    stopDecibelMeter();
    await startFrequency160();

    async function startFrequency160() {
      if (!sound.isEnabled160) {
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
    setSound((state) => ({ ...!state, isEnabled300: !sound.isEnabled300 }));

    stopDecibelMeter();
    await startFrequency300();

    async function startFrequency300() {
      if (!sound.isEnabled300) {
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
    setSound((state) => ({ ...!state, isEnabled500: !sound.isEnabled500 }));

    stopDecibelMeter();
    await startFrequency500();

    async function startFrequency500() {
      if (!sound.isEnabled500) {
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
    <View className="flex-3 justify-center">
      <View className={`bg-[${buttonsColor}] mx-3 py-3 rounded-xl`}>
        <Text className="text-white font-bold ml-4 mb-4">Frequencies</Text>
        <View className="flex-row justify-center">
          <TouchableOpacity
            onPress={isEnabled120hz}
            style={sound.isEnabled120 ? styles.freqBtnActive : styles.freqBtn}
          >
            <View style={styles.freqIconText}>
              <View
                style={
                  sound.isEnabled120 ? styles.iconWrapperOn : styles.iconWrapper
                }
              >
                <Image style={styles.icon} source={lowFreq}></Image>
              </View>
              <Text style={styles.freqText}>120 Hz</Text>
            </View>
            <View style={styles.freqControlText}>
              <Text style={styles.freqOnOff}>
                {sound.isEnabled120 ? "On" : "Off"}
              </Text>
              <Switch
                trackColor={{ true: iconActiveColor }}
                value={sound.isEnabled120}
                onValueChange={isEnabled120hz}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isEnabled160hz}
            style={sound.isEnabled160 ? styles.freqBtnActive : styles.freqBtn}
          >
            <View style={styles.freqIconText}>
              <View
                style={
                  sound.isEnabled160 ? styles.iconWrapperOn : styles.iconWrapper
                }
              >
                <Image style={styles.icon} source={medFreq}></Image>
              </View>
              <Text style={styles.freqText}>160 Hz</Text>
            </View>
            <View style={styles.freqControlText}>
              <Text style={styles.freqOnOff}>
                {sound.isEnabled160 ? "On" : "Off"}
              </Text>
              <Switch
                trackColor={{ true: iconActiveColor }}
                value={sound.isEnabled160}
                onValueChange={isEnabled160hz}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-4">
          <TouchableOpacity
            onPress={isEnabled300hz}
            style={sound.isEnabled300 ? styles.freqBtnActive : styles.freqBtn}
          >
            <View style={styles.freqIconText}>
              <View
                style={
                  sound.isEnabled300 ? styles.iconWrapperOn : styles.iconWrapper
                }
              >
                <Image style={styles.icon} source={highFreq} />
              </View>
              <Text style={styles.freqText}>300 Hz</Text>
            </View>
            <View style={styles.freqControlText}>
              <Text style={styles.freqOnOff}>
                {sound.isEnabled300 ? "On" : "Off"}
              </Text>
              <Switch
                trackColor={{ true: iconActiveColor }}
                value={sound.isEnabled300}
                onValueChange={isEnabled300hz}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={enable500Hz}
            style={sound.isEnabled500 ? styles.freqBtnActive : styles.freqBtn}
          >
            <View style={styles.freqIconText}>
              <View
                style={
                  sound.isEnabled500 ? styles.iconWrapperOn : styles.iconWrapper
                }
              >
                <Image style={styles.icon} source={xtHighFreq} />
              </View>
              <Text style={styles.freqText}>500 Hz</Text>
            </View>
            <View style={styles.freqControlText}>
              <Text style={styles.freqOnOff}>
                {sound.isEnabled500 ? "On" : "Off"}
              </Text>
              <Switch
                trackColor={{ true: iconActiveColor }}
                value={sound.isEnabled500}
                onValueChange={enable500Hz}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const bgColor = "#05103A";
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
    backgroundColor: bgColor,
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
    backgroundColor: buttonsColor,
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
