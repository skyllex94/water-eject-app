import { SafeAreaView } from "react-native";
import Frequencies from "../components/Frequencies";
import Programs from "../components/Programs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import SoundVisualizer from "../components/SoundVisualizer";
import { useEffect } from "react";

import { AudioRecorder, AudioUtils } from "react-native-audio";
let audioPath = AudioUtils.DocumentDirectoryPath + "/test.aac";

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
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <SoundVisualizer />
      <Frequencies />
      <Programs navigation={navigation} />
    </SafeAreaView>
  );
}

export default HomeStackScreen;
