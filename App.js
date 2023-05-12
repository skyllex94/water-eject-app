import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Frequencies from "./components/Frequencies";
import Waveform from "./components/Waveform";
import Programs from "./components/Programs";

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
              <MaterialCommunityIcons
                name="home"
                color={"#4AD0EE"}
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
                color={"#4AD0EE"}
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
  return (
    <View style={styles.container}>
      <Waveform />
      <Frequencies />
      <Programs />
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
    backgroundColor: "#05103A",
  },
});

export default App;
