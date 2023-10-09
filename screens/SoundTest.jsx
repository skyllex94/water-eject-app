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
import { useContext } from "react";
import { Context } from "../components/Context";
import Paywall from "./Paywall";

// React Native Navigator - Stack Navigator initializer
const Stack = createNativeStackNavigator();

export default function SoundTestStack() {
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
  // Context state for the current sound object test
  const { currSoundTest, setCurrSoundTest } = useContext(Context);

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-xl text-center mb-4">Sound Tests</Text>

      <ScrollView>
        <OverallTest />

        <SpeakersTest navigation={navigation} />

        <BassTest
          currSoundTest={currSoundTest}
          setCurrSoundTest={setCurrSoundTest}
        />

        <PolarityTest navigation={navigation} />

        <ImagingTest navigation={navigation} />
      </ScrollView>

      {/* <View className="flex-row relative items-center justify-center">
        <TouchableOpacity
          className="bg-[#1a2b68] items-center justify-center 
        rounded-l-full border-4 border-white h-20 w-36 mt-10 pr-10"
        >
          <Entypo name="controller-jump-to-start" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#38477f] items-center absolute z-10 
        justify-center top-5 rounded-full border-4 border-white border-solid h-28 w-28"
          activeOpacity={1}
          onPress={playPauseController}
        >
          {isPlaying ? (
            <Entypo name="controller-paus" size={60} color="white" />
          ) : (
            <Entypo name="controller-play" size={60} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1a2b68] items-center justify-center 
        rounded-r-full border-4 border-white h-20 w-36 mt-10 pl-10"
        >
          <Entypo name="controller-next" size={40} color="white" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
