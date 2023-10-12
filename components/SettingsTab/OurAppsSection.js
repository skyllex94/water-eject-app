import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";

export default function OurAppsSection() {
  return (
    <View className="mb-5">
      <Text className="text-gray-500 uppercase ml-4">Our Apps</Text>
      <View className="items-center">
        <ScrollView
          className="bg-[#162255] w-[95%] mt-5 rounded-lg"
          alwaysBounceHorizontal
          alwaysBounceVertical={false}
        >
          <View className="justify-center h-40 ml-3">
            <TouchableOpacity
              onPress={() => Linking.openURL("https://micronvpn.netlify.app")}
              className="justify-center items-start"
            >
              <View className="items-center">
                <View className="flex-row">
                  <Image
                    className="h-28 w-28 rounded-xl"
                    source={require("../../assets/icons/vpn_icon.png")}
                  />
                </View>
                <Text className="text-white mt-2">Micron VPN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
