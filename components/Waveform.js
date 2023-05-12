import { Button } from "@rneui/base";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Waveform() {
  return (
    <View style={styles.container}>
      <Text style={styles.waveform}>On You</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // backgroundColor: "green",
    marginTop: 150,
  },
  waveform: {
    color: "white",
  },
});
