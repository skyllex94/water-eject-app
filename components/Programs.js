import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Programs() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={isEnabled120hz}
        style={styles.freqBtn}
      >
        <Text style={styles.freqText}>Water Eject Prepping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },

  freqBtn: {
    width: "95%",
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
});
