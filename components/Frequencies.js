import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

function Frequencies() {
  const [start120, setStart120] = useState(true);
  const [start160, setStart160] = useState(true);

  const [sound, setSound] = useState();

  function start80hz() {
    console.log("80Hz");
  }

  async function start160hz() {
    if (start120) setStart120(false);
    setStart160((prev) => !prev);

    if (start160) {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/frequencies/160hz.mp3"),
        { isLooping: true }
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      sound.unloadAsync() || undefined;
    }
  }

  async function start120hz() {
    if (start160) setStart160(false);
    setStart120((prev) => !prev);

    if (start120) {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/frequencies/120hz.mp3"),
        { isLooping: true }
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      console.log("Unloading Sound");
      sound.unloadAsync() || undefined;
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.lowFreqOptions}>
        <TouchableOpacity onPress={start120hz} style={styles.freqBtn}>
          <Text style={styles.freqText}>{start120 ? "120Hz" : "Stop"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={start160hz} style={styles.freqBtn}>
          <Text style={styles.freqText}>{start160 ? "160Hz" : "Stop"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.highFreqOptions}>
        <TouchableOpacity style={styles.freqBtn}>
          <Text style={styles.freqText}>300 Hz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.freqBtn}>
          <Text style={styles.freqText}>400 Hz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 150,
  },
  lowFreqOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  highFreqOptions: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "center",
    alignContent: "center",
  },
  freqBtn: {
    width: "45%",
    marginHorizontal: 7,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#101C43",
  },
  freqText: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    color: "white",
  },
  divider: {
    marginHorizontal: 10,
    backgroundColor: "#cccccc",
  },
});

export default Frequencies;
