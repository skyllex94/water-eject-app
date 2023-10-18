import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import SoundVisualizer from "../components/SoundVisualizer";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WaterClearance() {
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
  async function clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (err) {}
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <View>
        <Text className="text-white text-center text-xl">Water Clearance</Text>
        <TouchableOpacity
          onPress={clearAsyncStorage}
          className="text-white text-center text-xl"
        >
          <Text className="text-white">Clear</Text>
        </TouchableOpacity>
        <SoundVisualizer />
      </View>
      <ScrollView>
        <Frequencies />
        <Programs navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
