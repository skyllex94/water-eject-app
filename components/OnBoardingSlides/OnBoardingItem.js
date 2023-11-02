import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";

export default function OnBoardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { width }]}>
      <View className="items-center justify-center">
        <Image
          resizeMode="contain"
          source={item.image}
          style={[styles.image, { width: width - 50, height: 225 }]}
          // TODO: Height could be adjusted for smaller screens Iphone 8 and below
        />
      </View>

      <View className="mt-10">
        <Text className="font-bold text-center text-[28px] px-6 mb-3 text-[#d1d1d1]">
          {item.title}
        </Text>
        <Text className="font-light text-center px-8 text-[#f3f3f3]">
          {item.description}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    alignContent: "center",
    justifyContent: "center",
  },
});
