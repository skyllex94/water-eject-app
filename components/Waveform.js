import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Waveform() {
  return (
    <View style={styles.container}>
      <Text style={styles.waveform}>Waveform to go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 15,
    // backgroundColor: "blue",
  },
  waveform: {
    color: "white",
  },
});
