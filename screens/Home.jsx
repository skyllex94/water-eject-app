import { View, Text, StyleSheet, StatusBar } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Text>Here wedsgf are</Text>
    </View>
  );
}

const bgColor = "#05103A";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default Home();
