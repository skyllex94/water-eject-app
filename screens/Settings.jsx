import { SafeAreaView, Text } from "react-native";
import BuySection from "../components/SettingsTab/BuySection";
import GeneralSection from "../components/SettingsTab/GeneralSection";
import OurAppsSection from "../components/SettingsTab/OurAppsSection";
import AboutSection from "../components/SettingsTab/AboutSection";

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Settings</Text>
      <BuySection />
      <GeneralSection />
      <OurAppsSection />
      <AboutSection />
    </SafeAreaView>
  );
}
