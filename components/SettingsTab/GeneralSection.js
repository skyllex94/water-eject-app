import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// Support email clipping dependencies
import { Toast } from "toastify-react-native";
import * as Clipboard from "expo-clipboard";

export default function GeneralSection({ navigation }) {
  async function copySupportEmail() {
    await Clipboard.setStringAsync("zionstudiosapps@gmail.com");
    Toast.info("Support email copied.", "top");
  }

  return (
    <View>
      <Text className="text-gray-500 uppercase ml-4">General</Text>
      <View className="items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("PrivacyPolicy")}
          className="bg-[#101C43] justify-center mt-5 h-12 w-[95%] rounded-lg"
        >
          <View className="flex-row items-center ml-5">
            <View className="mr-2">
              <MaterialIcons name="privacy-tip" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">Privacy Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("TermsOfUse")}
          className="bg-[#101C43] justify-center mt-2 h-12 w-[95%] rounded-lg"
        >
          <View className="flex-row items-center ml-5">
            <View className="mr-2">
              <Entypo name="news" size={24} color="white" />
            </View>
            <Text className="text-white text-lg">Terms of Use</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={copySupportEmail}
          className="bg-[#101C43] justify-center mt-2 mb-5 h-12 w-[95%] rounded-lg"
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center ml-5">
              <View className="mr-2">
                <MaterialIcons name="email" size={24} color="white" />
              </View>
              <Text className="text-white text-lg">Support</Text>
            </View>
            <Text className="text-gray-400 text-md mr-2">
              zionstudiosapps@gmail.com
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
  },
});
