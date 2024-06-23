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
          className="bg-[#101C43] w-[95%] mt-5 rounded-lg" // bg-[#162255]
          alwaysBounceHorizontal
          alwaysBounceVertical={false}
        >
          <View className="flex-row">
            <View className="justify-center h-40 ml-3">
              <TouchableOpacity
                onPress={() => Linking.openURL("https://micronvpn.netlify.app")}
                className="justify-center items-start"
              >
                <View className="items-center">
                  <View className="flex-row">
                    <Image
                      className="h-20 w-20 rounded-xl"
                      source={require("../../assets/icons/vpn_icon.png")}
                    />
                  </View>
                  <Text className="text-white mt-2">MicronVPN</Text>
                  <Text className="text-gray-500 text-center w-24 mt-1">
                    Premium VPN Service
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="justify-center h-40 ml-3">
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://apps.apple.com/us/app/sign-documents-e-signature-app/id6502412936?platform=iphone"
                  )
                }
                className="justify-center items-start"
              >
                <View className="items-center">
                  <View className="flex-row">
                    <Image
                      className="h-20 w-20 rounded-xl"
                      source={require("../../assets/icons/esign-icon.jpg")}
                    />
                  </View>
                  <Text className="text-white mt-2">SimpleSign</Text>
                  <Text className="text-gray-500 text-center w-24 mt-1">
                    eSign & Scan Documents
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
