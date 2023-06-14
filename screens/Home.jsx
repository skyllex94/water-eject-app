import { SafeAreaView, StyleSheet } from "react-native";
import Waveform from "../components/Waveform";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";
import { bgColor } from "../styles/ColorsUI";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import { useState } from "react";

const HomeStackScreen = () => {
  // React Native Navigator - Stack Navigator initializer
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HomeRoute">
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#101C43",
          },
        }}
      />
      <Stack.Screen
        name="Paywall"
        component={Paywall}
        options={{
          presentation: "modal",
          tabBarLabel: "Paywall",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function HomeScreen({ navigation }) {
  const [speed, setSpeed] = useState(1000);

  return (
    <SafeAreaView style={styles.container}>
      <Waveform speed={speed} />
      <Frequencies setSpeed={setSpeed} />
      <Programs navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default HomeStackScreen;
