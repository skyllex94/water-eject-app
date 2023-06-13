import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { bgColor } from "./styles/ColorsUI";
import { useState } from "react";

import { Context } from "./components/Context";
import HomeStackScreen from "./screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  const [isEnabled120, setIsEnabled120] = useState(false);
  const [isEnabled160, setIsEnabled160] = useState(false);
  const [isEnabled300, setIsEnabled300] = useState(false);
  const [isEnabled500, setIsEnabled500] = useState(false);

  const [isEnabledPrep, setIsEnabledPrep] = useState(false);
  const [prepAudioTime, setPrepAudioTime] = useState(0);
  const [isEnabledMain, setIsEnabledMain] = useState(false);

  const [currSound, setCurrSound] = useState();
  const [navigationPaywall, setNavigationPaywall] = useState();

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
        prepAudioTime,
        setPrepAudioTime,
        navigationPaywall,
        setNavigationPaywall,
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
                backgroundColor: "#101C43",
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={"white"}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "Settings",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#101C43",
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

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-white text-center">Settings Tab</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default App;
