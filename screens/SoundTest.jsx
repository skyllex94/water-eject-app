import { SafeAreaView, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import OverallTest from "../components/SoundTestTab/OverallTests/OverallTest";
import BassTest from "../components/SoundTestTab/BassTests/BassTest";
import SpeakersTest from "../components/SoundTestTab/SpeakersTest";
import PolarityTest from "../components/SoundTestTab/PolarityTest";
import ImagingTest from "../components/SoundTestTab/ImagingTest";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IsolationInfo from "../components/SoundTestTab/IsolationInfo";
import PolarityInfo from "../components/SoundTestTab/PolarityInfo";
import ImagingInfo from "../components/SoundTestTab/ImagingInfo";

import Paywall from "./Paywall";

// React Native Navigator - Stack Navigator initializer
const Stack = createNativeStackNavigator();

export default function SoundTest() {
  return (
    <Stack.Navigator initialRouteName="SoundTests">
      <Stack.Screen
        name="SoundTests"
        component={SoundTests}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IsolationInfo"
        component={IsolationInfo}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PolarityInfo"
        component={PolarityInfo}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ImagingInfo"
        component={ImagingInfo}
        options={{
          presentation: "modal",
          headerShown: false,
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

function SoundTests({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-xl text-center mb-4">Sound Tests</Text>

      <ScrollView>
        <OverallTest />

        <SpeakersTest navigation={navigation} />

        <BassTest navigation={navigation} />

        <PolarityTest navigation={navigation} />

        <ImagingTest navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
