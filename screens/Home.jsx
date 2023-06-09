import { StyleSheet, View } from "react-native";
import Waveform from "../components/Waveform";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";
import { bgColor } from "../styles/ColorsUI";

import useRevenueCat from "../hooks/useRevenueCat";

const HomeScreen = () => {
  const { currentOffering, customerInfo, isProMember } = useRevenueCat();

  console.log("DEBUG", currentOffering);

  return (
    <View style={styles.container}>
      <Waveform />
      <Frequencies />
      <Programs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default HomeScreen;
