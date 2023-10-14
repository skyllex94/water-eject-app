import { SafeAreaView, Text } from "react-native";
import BuySection from "../components/SettingsTab/BuySection";
import GeneralSection from "../components/SettingsTab/GeneralSection";
import OurAppsSection from "../components/SettingsTab/OurAppsSection";
import AboutSection from "../components/SettingsTab/AboutSection";
import { ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";

// React Native Navigator - Stack Navigator initializer
const Stack = createNativeStackNavigator();

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName="SettingsTab">
      <Stack.Screen
        name="SettingsTab"
        component={SettingsTab}
        options={{ headerShown: false }}
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

function SettingsTab({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Settings</Text>
      <ScrollView>
        <BuySection navigation={navigation} />
        <GeneralSection />
        <OurAppsSection />
        <AboutSection />
      </ScrollView>
    </SafeAreaView>
  );
}
