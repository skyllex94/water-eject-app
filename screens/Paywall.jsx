import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function Paywall({ navigation }) {
  const { currentOffering } = useRevenueCat();
  const [paywallLoaded, setPaywallLoaded] = useState(false);
  const [purchaseSpinner, setPurchaseSpinner] = useState(false);

  async function handleWeeklyPurchase() {
    setPurchaseSpinner(true);
    if (!currentOffering?.weekly) {
      setPurchaseSpinner(false);
      return;
    }

    try {
      const purchaserInfo = await Purchases.purchasePackage(
        currentOffering.weekly
      );
      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        // console.log(
        //   "Weekly Package Purchased.",
        //   purchaserInfo.customerInfo.entitlements.active
        // );
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) setPurchaseSpinner(false);
    }
    setPurchaseSpinner(false);
  }

  async function handleMonthlyPurchase() {
    setPurchaseSpinner(true);
    if (!currentOffering?.monthly) {
      setPurchaseSpinner(false);
      return;
    }

    try {
      const purchaserInfo = await Purchases.purchasePackage(
        currentOffering.monthly
      );
      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        console.log(
          "Monthly Package Purchased.",
          purchaserInfo.customerInfo.entitlements.active
        );
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) setPurchaseSpinner(false);
    }
    setPurchaseSpinner(false);
  }

  async function handleRestorePurchase() {
    setPurchaseSpinner(true);
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo?.activeSubscriptions.length > 0) {
      Alert.alert("Success", "Your purchase has been restored");
      navigation.goBack();
    } else Alert.alert("Failure", "There are no purchases to restore");
    setPurchaseSpinner(false);
  }

  // Fetch all pricing data before displaying paywall
  useEffect(() => {
    if (
      currentOffering?.weekly?.product.priceString &&
      currentOffering?.monthly?.product.priceString
    )
      setPaywallLoaded(true);
  }, [currentOffering]);

  return (
    <ScrollView className="bg-[#142251] flex-1">
      {paywallLoaded ? (
        <View>
          <Spinner visible={purchaseSpinner} />

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
              <Ionicons
                name="md-close-circle-sharp"
                size={32}
                color="#E5962D"
              />
            </TouchableOpacity>

            <View className="items-center">
              <MaterialCommunityIcons
                name="trophy-award"
                size={120}
                color="#E5962D"
              />
            </View>

            <View className="space-y-5 py-3">
              <View className="flex-row space-x-8 items-center">
                <Ionicons name="md-key" size={32} color="#E5962D" />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Access to all pro features
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Access to all dedicated frequency programs for ultimate
                    results and clear speakers sound.
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-5 py-3">
              <View className="flex-row space-x-8 items-center">
                <Ionicons
                  name="md-person-add-outline"
                  size={32}
                  color="#E5962D"
                />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Expertly made programs with proven results
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Rest assured with our 8 minute preparation alternating
                    sound, and after that our dedicated 16 minutes main water
                    ejection program, your phone will thank you.
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-5 py-3">
              <View className="flex-row space-x-8 items-center">
                <Ionicons name="md-star" size={32} color="#E5962D" />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Access to our custom frequencies
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Get a lot more value with our included custom frequency
                    creator and decibal meters.
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

          <TouchableOpacity
            onPress={handleMonthlyPurchase}
            className="items-center px-10 py-5 border-2 border-[#E5962D] mx-10 mt-3 rounded-full"
          >
            <Text className="text-white text-md text-center font-bold">
              Or a montly plan
            </Text>
            <Text className="text-white">
              {currentOffering?.monthly?.product.priceString} / per month
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRestorePurchase}>
            <Text className="text-white  text-center mt-5">
              Restore Purchase
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator className="pt-10" size="large" />
      )}
    </ScrollView>
  );
}
