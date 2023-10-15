import { SafeAreaView, ScrollView } from "react-native";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import SoundVisualizer from "../components/SoundVisualizer";
import { Text } from "react-native";

export default function HomeStackScreen() {
  // React Native Navigator - Stack Navigator initializer
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="WaterClearance">
      <Stack.Screen
        name="WaterClearance"
        component={WaterClearanceTab}
        options={{
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
}

function WaterClearanceTab({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Water Clearance</Text>

      <ScrollView>
        <SoundVisualizer />
        <Frequencies />
        <Programs navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
