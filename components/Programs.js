import { StyleSheet, View } from "react-native";

import MainProgram from "./MainProgram";
import PrepProgram from "./PrepProgram";

export default function Programs() {
  return (
    <View style={styles.container}>
      <PrepProgram />
      <MainProgram />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "flex-start",
  },
});
