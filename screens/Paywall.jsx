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
import { MaterialIcons } from "@expo/vector-icons";

import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsOfUse from "../components/PaywallModal/TermsOfUse";
import PrivacyPolicy from "../components/PaywallModal/PrivacyPolicy";

export default function Paywall() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Paywall"
      tabBarLabel={{ backgroundColor: "#142251" }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Paywall" component={PaywallModal} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

function PaywallModal({ navigation }) {
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
        // console.log(
        //   "Monthly Package Purchased.",
        //   purchaserInfo.customerInfo.entitlements.active
        // );
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
                <MaterialCommunityIcons
                  name="speaker-wireless"
                  size={32}
                  color="#E5962D"
                />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Fix Phone and Earbuds Speakers
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Access to our frequency programs and ongoing frequency
                    development for ejecting the water out of your iPhone and
                    AirPods.
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
                    Tests, Speaker Isolation, Sterio Imaging Test and more to
                    come.
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-5 py-2">
              <View className="flex-row space-x-8 items-center">
                <MaterialIcons name="update" size={32} color="#E5962D" />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    Get the Latest Updates
                  </Text>
                  <Text className="text-white text-sm font-extralight">
                    Continuously refining our frequency programs and adding
                    additional ones on a regular basis to give better, faster
                    and diverse results.
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

          <View className="flex-row items-center justify-between px-12 mt-5">
            <TouchableOpacity
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text className="text-gray-400 text-center">Privacy Policy</Text>
            </TouchableOpacity>

            <Text className="text-gray-400">|</Text>

            <TouchableOpacity onPress={handleRestorePurchase}>
              <Text className="text-gray-400 text-center">Restore</Text>
            </TouchableOpacity>

            <Text className="text-gray-400">|</Text>

            <TouchableOpacity onPress={() => navigation.navigate("TermsOfUse")}>
              <Text className="text-gray-400 text-center">Terms Of Use</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ActivityIndicator className="pt-10" size="large" />
      )}
    </ScrollView>
  );
}
