import { FlatList, SafeAreaView, Animated, View } from "react-native";
import React, { useRef, useState } from "react";
import slides from "../components/Utils/Slides";
import OnBoardingItem from "../components/OnBoardingSlides/OnBoardingItem";
import Indicator from "../components/OnBoardingSlides/Indicator";
import NextButton from "../components/OnBoardingSlides/NextButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases from "react-native-purchases";
import useRevenueCat from "../hooks/useRevenueCat";
import Spinner from "react-native-loading-spinner-overlay";
import * as StoreReview from "expo-store-review";

export default function OnBoarding({ navigation }) {
  const [currSlide, setCurrSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrSlide(viewableItems[0].index);
  }).current;

  const { currentOffering } = useRevenueCat();
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
        await AsyncStorage.setItem("@isAppFirstLaunched", "false");
      }
    } catch (e) {
      if (!e.userCancelled) setPurchaseSpinner(false);
    }
    setPurchaseSpinner(false);
  }

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slideForward = async () => {
    if (currSlide < slides.length - 1)
      slidesRef.current.scrollToIndex({ index: currSlide + 1 });
    // If no more slides, complete the OnBoarding screen,
    // store the value in async storage, and navigate to the App
    else {
      try {
        await handleWeeklyPurchase();
        const value = await AsyncStorage.getItem("@isAppFirstLaunched");
        if (value !== null) {
          navigation.replace("MainApp");
          StoreReview.requestReview();
        }
      } catch (err) {
        console.log("Error @setItem:", err);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Spinner visible={purchaseSpinner} />

      <FlatList
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => (
          <OnBoardingItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      <View className="items-center">
        <Indicator data={slides} scrollX={scrollX} />

        <NextButton
          slideForward={slideForward}
          percentage={(currSlide + 1) * (100 / slides.length)}
          currSlide={currSlide}
          currentOffering={currentOffering}
        />
      </View>
    </SafeAreaView>
  );
}
