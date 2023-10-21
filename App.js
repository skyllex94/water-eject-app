import { ActivityIndicator, StatusBar, View } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Context } from "./components/Context";
import MeterScreen from "./screens/Meter";
import SoundTest from "./screens/SoundTest";
import Settings from "./screens/Settings";

// Toast Notification Manager for Settings mainly
import ToastManager from "toastify-react-native";

// Decibel Metering Imports to be stopped when switching tabs
import { AudioRecorder } from "react-native-audio";
import WaterClearance from "./screens/Clearance";

// Introductory slides of the app
import OnBoarding from "./screens/OnBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultTheme } from "@react-navigation/native";
import * as StoreReview from "expo-store-review";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#101C40",
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    checkIfAppWasLaunched();
    // StoreReview.requestReview();
  }, []);

  const checkIfAppWasLaunched = async () => {
    try {
      const value = await AsyncStorage.getItem("@isAppFirstLaunched");
      console.log("value:", value);

      if (value === null) setIsAppFirstLaunched(true);
      else setIsAppFirstLaunched(false);
    } catch (error) {
      console.log("Error @checkIfAppWasLaunched", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {isAppFirstLaunched === true && (
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="MainApp"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Loading = () => (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" />
  </View>
);

const Main = () => {
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
            tabBarIcon: ({ _, size }) => (
              <MaterialCommunityIcons
                name="water-outline"
                color={"white"}
                size={size}
              />
            ),
          }}
          listeners={{
            tabPress: async () => {
              AudioRecorder.stopRecording(); // TODO
            },
          }}
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
              // TODO: Put a listener to shut down any playing sound when switching to the dB Meter
            }
          }
        />
        <Tab.Screen
          name="Sound Tests"
          component={SoundTest}
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
          listeners={{
            tabPress: async () => {
              AudioRecorder.stopRecording();
            },
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
    </Context.Provider>
  );
};
