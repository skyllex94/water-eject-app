import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Waveform() {
  const [waveform, setWaveform] = useState([12, 23, 25, 35, 32, 46, 43, 35]);

  return (
    <View style={styles.container}>
      <Text style={styles.waveform}>Waveform to go here</Text>
      {waveform.map((wave, idx) => {
        <Text key={idx}>{wave}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 15,
  },
  waveform: {
    color: "white",
  },
});
