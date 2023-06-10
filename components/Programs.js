import { StyleSheet, View } from "react-native";

import MainProgram from "./MainProgram";
import PrepProgram from "./PrepProgram";

export default function Programs({ navigation }) {
  return (
    <View style={styles.container}>
      <PrepProgram navigation={navigation} />
      <MainProgram navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "flex-start",
  },
});
