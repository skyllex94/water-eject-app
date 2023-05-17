import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Frequencies from "./components/Frequencies";
import Waveform from "./components/Waveform";
import Programs from "./components/Programs";
import { bgColor } from "./styles/ColorsUI";
import { useState } from "react";

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="light-content"
      />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#101C43",
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={"white"} size={size} />
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
  );
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [isEnabled120, setIsEnabled120] = useState(false);
  const [isEnabled160, setIsEnabled160] = useState(false);
  const [isEnabled300, setIsEnabled300] = useState(false);
  const [isEnabled500, setIsEnabled500] = useState(false);

  const [isEnabledPrep, setIsEnabledPrep] = useState(false);
  const [isEnabledMain, setIsEnabledMain] = useState(false);

  const props = {
    isEnabled120: isEnabled120,
    setIsEnabled120: setIsEnabled120,
    isEnabled160: isEnabled160,
    setIsEnabled160: setIsEnabled160,
    isEnabled300: isEnabled300,
    setIsEnabled300: setIsEnabled300,
    isEnabled500: isEnabled500,
    setIsEnabled500: setIsEnabled500,
    isEnabledPrep: isEnabledPrep,
    setIsEnabledPrep: setIsEnabledPrep,
    isEnabledMain: isEnabledMain,
    setIsEnabledMain: setIsEnabledMain,
  };

  return (
    <View style={styles.container}>
      <Waveform />
      <Frequencies props={props} />
      <Programs props={props} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Here we are</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});

export default App;
