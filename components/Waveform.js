import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Wavey from "./Wavey";

export default function Waveform() {
  return (
    <View style={styles.container}>
      <Text style={styles.waveform}>Waveform to go here</Text>
      <Wavey />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 150,
  },
  waveform: {
    color: "white",
  },
});
