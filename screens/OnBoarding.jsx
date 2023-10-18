import { FlatList, SafeAreaView, Animated, View } from "react-native";
import React, { useRef, useState } from "react";
import slides from "../components/util/Slides";
import OnBoardingItem from "../components/OnBoardingSlides/OnBoardingItem";
import Indicator from "../components/OnBoardingSlides/Indicator";
import NextButton from "../components/OnBoardingSlides/NextButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Main } from "../App";

export default function OnBoarding() {
  const [currSlide, setCurrSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrSlide(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slideForward = async () => {
    if (currSlide < slides.length - 1)
      slidesRef.current.scrollToIndex({ index: currSlide + 1 });
    else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        <Main />;
      } catch (err) {
        console.log("Error @setItem:", err);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <FlatList
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
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

      <Indicator data={slides} scrollX={scrollX} />

      <NextButton
        slideForward={slideForward}
        percentage={(currSlide + 1) * (100 / slides.length)}
      />
    </SafeAreaView>
  );
}
