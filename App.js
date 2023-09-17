import { StatusBar } from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Context } from "./components/Context";
import HomeStackScreen from "./screens/Home";
import MeterScreen from "./screens/Meter";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

// Decibel Metering Imports to be stopped when switching tabs
import { AudioRecorder } from "react-native-audio";

function App() {
  // States for enabling any sound to play or stop playing
  const [isEnabled120, setIsEnabled120] = useState(false);
  const [isEnabled160, setIsEnabled160] = useState(false);
  const [isEnabled300, setIsEnabled300] = useState(false);
  const [isEnabled500, setIsEnabled500] = useState(false);

  const [isEnabledPrep, setIsEnabledPrep] = useState(false);
  const [isEnabledMain, setIsEnabledMain] = useState(false);

  // Currently playing frequency or program sound
  const [currSound, setCurrSound] = useState();
  const [navigationPaywall, setNavigationPaywall] = useState();

  // Sound Visualizer State
  const [visualizerParams, setVisualizerParams] = useState({
    speed: 700,
    frequency: 3,
    amplitude: 5,
  });

  const Tab = createBottomTabNavigator();

  return (
    <Context.Provider
      value={{
        isEnabled120,
        setIsEnabled120,
        isEnabled160,
        setIsEnabled160,
        isEnabled300,
        setIsEnabled300,
        isEnabled500,
        setIsEnabled500,
        isEnabledPrep,
        setIsEnabledPrep,
        isEnabledMain,
        setIsEnabledMain,
        currSound,
        setCurrSound,
        navigationPaywall,
        setNavigationPaywall,
        visualizerParams,
        setVisualizerParams,
      }}
    >
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="light-content"
        />
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: "Home",
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
            listeners={{
              tabPress: async () => {
                await AudioRecorder.stopRecording();
              },
            }}
          />
          <Tab.Screen
            name="Meter"
            component={MeterScreen}
            options={{
              tabBarLabel: "Meter",
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
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C40",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
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
