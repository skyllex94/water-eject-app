import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SoundVisualizer from "./SoundVisualizer";

export default function Waveform() {
  const [waveform, setWaveform] = useState([12, 23, 25, 35, 32, 46, 43, 35]);

  return (
    <View style={styles.container}>
      <SoundVisualizer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 15,
  },
  waveform: {
    color: "white",
  },
});
