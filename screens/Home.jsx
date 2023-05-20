import { View, Text, StyleSheet } from "react-native";
import { bgColor } from "../styles/ColorsUI";

// Try-out

function Home() {
  return (
    <View style={styles.container}>
      <Text>Here wedsgf are</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default Home();
