import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { freq160 } from "../assets/freq_sounds/160_Hz.mp3";
import Sound from "react-native-sound";

function Frequencies() {
  const freq160hz = new Sound(freq160);

  function play160hz() {
    freq160hz.play(() => freq160hz.release());
  }

  return (
    <View style={styles.main}>
      <View style={styles.freqOptions}>
        <Button
          title="160 Hz"
          onPress={play160hz}
          style={styles.freqBtn}
          color="white"
        />
        <Text style={styles.divider} />
        <Button title="300 Hz" style={styles.freqBtn} color="white" />
        <Text style={styles.divider} />
        <Button title="400 Hz" style={styles.freqBtn} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 150,
  },
  freqOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    color: "white",
  },
  freqBtn: {
    borderWidth: 1,
  },
  divider: {
    marginHorizontal: 10,
    backgroundColor: "#cccccc",
  },
});

export default Frequencies;
