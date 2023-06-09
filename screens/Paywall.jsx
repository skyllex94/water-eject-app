import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";

// NavigationProp = NativeStackNavigationProp("Paywall");
// TODO: Make the close button close the modal and return back to the main stack

export default function Paywall() {
  const navigation = useNavigation;
  const { currentOffering } = useRevenueCat();

  async function handleWeeklyPurchase() {
    if (!currentOffering?.weekly) return;

    const purchaserInfo = await Purchases.purchasePackage(
      currentOffering.weekly
    );

    console.log(
      "Weekly Package Purchased",
      purchaserInfo.customerInfo.entitlements.active
    );

    if (purchaserInfo.customerInfo.entitlements.active.pro) {
      // Not working yet
      navigation.goBack();
    }
  }

  return (
    <ScrollView className="bg-[#1A2F44] flex-1">
      <View className="m-5 space-y-0  ">
        <Text className="text-2xl text-center uppercase text-white font-bold mb-5">
          Upgrade
        </Text>

        <Text className="text-center text-white mb-5">
          Upgrade to Pro membership to access all features.
        </Text>

        <TouchableOpacity
          className="absolute top-0 right-0"
          onPress={navigation.goBack}
        >
          <Ionicons name="md-close-circle-sharp" size={32} color="#E5962D" />
        </TouchableOpacity>

        <View className="items-center">
          <MaterialCommunityIcons
            name="trophy-award"
            size={150}
            color="#E5962D"
          />
        </View>

        <View className="space-y-5 py-3">
          <View className="flex-row space-x-10 items-center">
            <Ionicons name="md-key" size={32} color="#E5962D" />
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                Access to all pro features
              </Text>
              <Text className="text-white text-sm font-extralight">
                Access to all dedicated frequency programs for ultimate results
                and clear speakers sound.
              </Text>
            </View>
          </View>
        </View>

        <View className="space-y-5 py-3">
          <View className="flex-row space-x-10 items-center">
            <Ionicons name="md-person-add-outline" size={32} color="#E5962D" />
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                Expertly made Programs with proven results
              </Text>
              <Text className="text-white text-sm font-extralight">
                Rest assured with out 8 minute preparation alternating sound,
                and after that our dedicated 16 minutes main water ejection
                program, your phone will thank you.
              </Text>
            </View>
          </View>
        </View>

        <View className="space-y-5 py-3">
          <View className="flex-row space-x-10 items-center">
            <Ionicons name="md-star" size={32} color="#E5962D" />
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">
                Access to our custom frequencies
              </Text>
              <Text className="text-white text-sm font-extralight">
                Get a lot more value with our included custom frequency creator
                and decibal meters.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Subscription Buttons */}

      <TouchableOpacity
        onPress={handleWeeklyPurchase}
        className="items-center px-10 py-5 bg-[#E5962D] mx-10 rounded-full"
      >
        <Text className="text-white text-md text-center font-bold">
          Free trial for 3 days...
        </Text>
        <Text className="text-white">
          {currentOffering?.weekly?.product.priceString} / weekly after
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
