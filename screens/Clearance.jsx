import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Frequencies from "../components/ClearanceTab/Frequencies";
import Programs from "../components/ClearanceTab/Programs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Paywall from "./Paywall";
import SoundVisualizer from "../components/ClearanceTab/SoundVisualizer";
import { Text } from "react-native";
import InfoFrequencies from "../components/ClearanceTab/InfoFrequencies";
import InfoPrograms from "../components/ClearanceTab/InfoPrograms";

import { PlayerContext } from "../contexts/PlayerContext";

import PlayingProgramPrep from "../components/ClearanceTab/PlayingProgramPrep";
import PlayingProgramMain from "../components/ClearanceTab/PlayingProgramMain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TermsOfUse from "../components/PaywallModal/TermsOfUse";

export default function WaterClearance() {
  // React Native Navigator - Stack Navigator initializer
  const Stack = createNativeStackNavigator();

  // Prep Program Player States
  const [secondsPrep, setSecondsPrep] = useState(0);
  const [minutesPrep, setMinutesPrep] = useState(0);
  const [waveformTimePrep, setWaveformTimePrep] = useState(0);

  // Main Program Player States
  const [secondsMain, setSecondsMain] = useState(0);
  const [minutesMain, setMinutesMain] = useState(0);
  const [waveformTimeMain, setWaveformTimeMain] = useState(0);

  const [currStatus, setCurrStatus] = useState({ status: "-" });

  return (
    <PlayerContext.Provider
      value={{
        secondsPrep,
        setSecondsPrep,
        minutesPrep,
        setMinutesPrep,
        waveformTimePrep,
        setWaveformTimePrep,

        secondsMain,
        setSecondsMain,
        minutesMain,
        setMinutesMain,
        waveformTimeMain,
        setWaveformTimeMain,

        currStatus,
        setCurrStatus,
      }}
    >
      <Stack.Navigator
        initialRouteName="WaterClearance"
        tabBarLabel={{ backgroundColor: "#101C43" }}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="WaterClearance" component={WaterClearanceTab} />
        <Stack.Screen
          name="InfoFrequencies"
          component={InfoFrequencies}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="InfoPrograms"
          component={InfoPrograms}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="PlayingProgramPrep"
          component={PlayingProgramPrep}
        />
        <Stack.Screen
          name="PlayingProgramMain"
          component={PlayingProgramMain}
        />
        <Stack.Screen
          name="TermsOfUse"
          component={TermsOfUse}
          options={{ presentation: "card" }}
        />
        <Stack.Screen
          name="Paywall"
          component={Paywall}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </PlayerContext.Provider>
  );
}

function WaterClearanceTab({ navigation }) {
  async function clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem("@isAppFirstLaunched");
    } catch (err) {
      console.log("RemoveItem from Async Storage Error.", err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <View>
        <Text className="text-white text-center text-xl">
          WaterDrop Clearance
        </Text>

        <TouchableOpacity
          onPress={clearAsyncStorage}
          className="text-white text-center text-xl"
        >
          <Text className="text-white">Clear</Text>
        </TouchableOpacity>

        <SoundVisualizer />
      </View>
      <ScrollView>
        <Frequencies navigation={navigation} />
        <Programs navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
