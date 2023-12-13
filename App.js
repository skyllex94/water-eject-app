import {
  ActivityIndicator,
  StatusBar,
  View,
  Text,
  Animated,
  FadeIn,
} from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Asset } from "expo-asset";

import { Context } from "./contexts/Context";
import MeterScreen from "./screens/Meter";
import SoundTest from "./screens/SoundTest";
import Settings from "./screens/Settings";

// Toast Notification Manager for Settings mainly
import ToastManager from "toastify-react-native";

// Decibel Metering Imports to be stopped when switching tabs
import WaterClearance from "./screens/Clearance";

// Introductory slides of the app
import OnBoarding from "./screens/OnBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultTheme } from "@react-navigation/native";
// Removing Warning Messages
import { LogBox } from "react-native";
import { Audio } from "expo-av";
import { useCallback } from "react";
import AnimatedSplashScreen from "./components/SplashScreen/SplashScreen";
import * as SplashScreen from "expo-splash-screen";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#101C40",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState();

  const cacheResources = async () => {
    const images = [
      require("./assets/icons/lowfreqIcon.png"),
      require("./assets/icons/medfreqIcon.png"),
      require("./assets/icons/highfreqIcon.png"),
      require("./assets/icons/xthighfreqIcon.png"),
      require("./assets/images/clearance/airpods.png"),
      require("./assets/images/clearance/receiver.png"),
      require("./assets/images/clearance/speaker.png"),
    ];

    const sounds = [
      require("./assets/programs/main.mp3"),
      // require("./assets/icons/medfreqIcon.png"),
      // require("./assets/icons/highfreqIcon.png"),
      // require("./assets/icons/xthighfreqIcon.png"),
    ];

    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );

    const cacheSounds = sounds.map((sound) =>
      Asset.fromModule(sound).downloadAsync()
    );

    return Promise.all([...cacheImages, ...cacheSounds]);
  };

  useEffect(() => {
    async function loadApp() {
      try {
        // Check if App is started for the first time
        const value = await AsyncStorage.getItem("@isAppFirstLaunched");
        if (value === null) setIsAppFirstLaunched(true);
        else setIsAppFirstLaunched(false);

        // Load Resources
        await cacheResources();

        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.log("Error @checkIfAppWasLaunched", err);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    loadApp();
  }, []);

  if (!appIsReady) {
    return <AnimatedSplashScreen className="flex-1" />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
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

const Main = () => {
  // UI for any sound playing
  const [sound, setSound] = useState({});
  // Audio playing from any sound
  const [currSound, setCurrSound] = useState();
  // Decibel metering state
  const [recording, setRecording] = useState();

  // Sound Visualizer State
  const [visualizerParams, setVisualizerParams] = useState({
    speed: 500,
    frequency: 3,
    amplitude: 25,
  });

  // Play on silent mode being active
  if (Platform.OS === "ios")
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

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
        recording,
        setRecording,
      }}
    >
      <ToastManager />

      <Tab.Navigator screenOptions={{ lazy: true }}>
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
