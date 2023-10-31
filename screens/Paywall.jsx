import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
        console.log(
          "Weekly Package Purchased.",
          purchaserInfo.customerInfo.entitlements.active
        );
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
                size={96}
                color="#E5962D"
              />
            </View>

            <View className="space-y-5 py-2">
              <View className="flex-row space-x-8 items-center">
                <Ionicons name="md-key" size={32} color="#E5962D" />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Access to all Pro Features
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Access to our 2 frequency programs (8 and 16 minutes) for
                    ultimate results and clear speakers sound. Played them once
                    and see the results.
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-5 py-2">
              <View className="flex-row space-x-8 items-center">
                <Entypo name="sound" size={32} color="#E5962D" />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Get All of Our Test Sounds
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Included 15+ Sound Tests: Bass Accuracy Test, Polarity
                    Tests, Speaker Isolation for individual speaker test and
                    Sterio Imaging Test.
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-5 py-2">
              <View className="flex-row space-x-8 items-center">
                <MaterialCommunityIcons
                  name="speedometer"
                  size={32}
                  color="#E5962D"
                />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Decibel Sound Meter
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Enjoy an accurate decibel meter so you can measure the
                    current decibel level at any place you are.
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
              Weekly Plan - Popular
            </Text>
            <Text className="text-white">
              {currentOffering?.weekly?.product.priceString} / per week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleMonthlyPurchase}
            className="items-center px-10 py-5 border-2 border-[#E5962D] mx-10 mt-3 rounded-full"
          >
            <Text className="text-white text-md text-center font-bold">
              Or a Monthly Plan
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
