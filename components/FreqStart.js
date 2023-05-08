import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

function FreqStartStop() {
  const [start, setStart] = useState(false);

  function handleStart() {
    setStart((prev) => !prev);
  }

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={handleStart} style={styles.btn}>
        <Text>{start ? "Start" : "Stop"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#76b5c5",
  },
});

export default FreqStartStop;
