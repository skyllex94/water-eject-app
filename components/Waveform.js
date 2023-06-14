import React from "react";
import { StyleSheet, View } from "react-native";
import SoundVisualizer from "./SoundVisualizer";

export default function Waveform() {
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
    borderRadius: 10,
  },
});
