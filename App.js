import { ActivityIndicator, StatusBar, View } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Context } from "./components/Context";
import MeterScreen from "./screens/Meter";
import SoundTestStack from "./screens/SoundTest";
import Settings from "./screens/Settings";

// Toast Notification Manager for Settings mainly
import ToastManager from "toastify-react-native";

// Decibel Metering Imports to be stopped when switching tabs
import { AudioRecorder } from "react-native-audio";
import WaterClearance from "./screens/Clearance";

// Introductory slides of the app
import OnBoarding from "./screens/OnBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnBoarding, setViewedOnBoarding] = useState(false);

  useEffect(() => {
    checkOnBoarding();
  }, []);

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) setViewedOnBoarding(true);
    } catch (error) {
      console.log("Error @checkOnboarding", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? <Loading /> : viewedOnBoarding ? <Main /> : <OnBoarding />;
}

const Loading = () => (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" />
  </View>
);

export const Main = () => {
  // UI for any sound playing
  const [sound, setSound] = useState({});
  // Currently playing frequency or program sound
  const [currSound, setCurrSound] = useState();

  // Sound Visualizer State
  const [visualizerParams, setVisualizerParams] = useState({
    speed: 500,
    frequency: 3,
    amplitude: 5,
  });

  const Tab = createBottomTabNavigator();

  return (
    <Context.Provider
      value={{
        sound,
        setSound,
        currSound,
        setCurrSound,
        visualizerParams,
        setVisualizerParams,
      }}
    >
      <NavigationContainer>
        <ToastManager />
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="light-content"
        />
        <Tab.Navigator>
          <Tab.Screen
            name="Water Eject"
            component={WaterClearance}
            options={{
              tabBarLabel: "Water Clearance",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C40",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="water-outline"
                  color={"white"}
                  size={size}
                />
              ),
            }}
            listeners={
              {
                // tabPress: async () => {
                //   AudioRecorder.stopRecording();
                //   // Unload the audio object for the sound test
                //   if (currSoundTest) currSoundTest.unloadAsync() || undefined;
                //   // Turn off any UI on the test tab which might be playing
                //   if (tests) setTests((state) => !state);
                // },
              }
            }
          />
          <Tab.Screen
            name="Meter"
            component={MeterScreen}
            options={{
              tabBarLabel: "dB Meter",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C40",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="speedometer-slow"
                  color={"lightgray"}
                  size={size}
                />
              ),
            }}
            listeners={
              {
                // tabPress: async () => {
                //   if (currSound) currSound.unloadAsync() || undefined;
                //   // UI objects to be turned off
                //   turnOffAllFreqUI();
                //   // Unload the audio object for the sound test
                //   if (currSoundTest) currSoundTest.unloadAsync() || undefined;
                //   // Turn off any UI on the test tab which might be playing
                //   if (tests) setTests((state) => !state);
                // },
              }
            }
          />
          <Tab.Screen
            name="Sound Tests"
            component={SoundTestStack}
            options={{
              tabBarLabel: "Sound Tests",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C40",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="atom-variant"
                  color={"lightgray"}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: "Settings",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C40",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="cogs"
                  color={"lightgray"}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};
