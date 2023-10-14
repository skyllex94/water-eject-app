import { StatusBar } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Context } from "./components/Context";
import HomeStackScreen from "./screens/Home";
import MeterScreen from "./screens/Meter";
import SoundTestStack from "./screens/SoundTest";
import Settings from "./screens/Settings";

// Toast Notification Manager for Settings mainly
import ToastManager from "toastify-react-native";

// Decibel Metering Imports to be stopped when switching tabs
import { AudioRecorder } from "react-native-audio";

function App() {
  // UI for the water ejection tab
  const [freq, setFreq] = useState({});
  // Currently playing frequency or program sound
  const [currSound, setCurrSound] = useState();

  // UI State for testing sounds
  const [tests, setTests] = useState({});
  // The Audio Music Object for the sound test playing
  const [currSoundTest, setCurrSoundTest] = useState();

  // Sound Visualizer State
  const [visualizerParams, setVisualizerParams] = useState({
    speed: 500,
    frequency: 3,
    amplitude: 5,
  });

  function turnOffAllFreqUI() {
    setFreq((state) => !state);
    setVisualizerParams({ speed: 500, frequency: 2, amplitude: 10 });
  }

  const Tab = createBottomTabNavigator();

  return (
    <Context.Provider
      value={{
        freq,
        setFreq,
        currSound,
        setCurrSound,
        visualizerParams,
        setVisualizerParams,
        tests,
        setTests,
        currSoundTest,
        setCurrSoundTest,
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
            component={HomeStackScreen}
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
}

export default App;
