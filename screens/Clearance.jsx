import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
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
import PlayingProgramEar from "../components/ClearanceTab/PlayingProgramEar";
import PlayingProgramAirpods from "../components/ClearanceTab/PlayingProgramAirpods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TermsOfUse from "../components/PaywallModal/TermsOfUse";

export default function WaterClearance() {
  // React Native Navigator - Stack Navigator initializer
  const Stack = createNativeStackNavigator();

  // Programs Player States
  const [currTimePrep, setCurrTimePrep] = useState(0);
  const [currTimeMain, setCurrTimeMain] = useState(0);
  const [currTimeEar, setCurrTimeEar] = useState(0);
  const [currTimePods, setCurrTimePods] = useState(0);

  // Program Current Status when playing
  const [currStatus, setCurrStatus] = useState({ status: "-" });

  return (
    <PlayerContext.Provider
      value={{
        currTimePrep,
        setCurrTimePrep,
        currTimeMain,
        setCurrTimeMain,
        currTimeEar,
        setCurrTimeEar,
        currTimePods,
        setCurrTimePods,
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
        <Stack.Screen name="PlayingProgramEar" component={PlayingProgramEar} />
        <Stack.Screen
          name="PlayingProgramAirpods"
          component={PlayingProgramAirpods}
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
