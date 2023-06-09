import { SafeAreaView, StyleSheet, View } from "react-native";
import Waveform from "../components/Waveform";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";
import { bgColor } from "../styles/ColorsUI";

import useRevenueCat from "../hooks/useRevenueCat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import { Button } from "@rneui/base";

const HomeStackScreen = () => {
  // React Native Navigator - Stack Navigator initializer
  const Stack = createNativeStackNavigator();

  const { currentOffering, customerInfo, isProMember } = useRevenueCat();

  console.log("DEBUG HomeScreen", currentOffering);

  return (
    <Stack.Navigator>
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
  return (
    <SafeAreaView style={styles.container}>
      <Waveform />
      <Button
        title="Go to Paywall"
        onPress={() => navigation.navigate("Paywall")}
      />
      <Frequencies />
      <Programs />
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
