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
      <View className="flex-1 items-center justify-center">
        <Image
          resizeMode="contain"
          source={item.image}
          style={[styles.image, { width: width - 50, height: 250 }]}
        />
      </View>

      <View style={styles.text}>
        <Text className="font-bold text-center text-[28px] px-6 mb-3 text-[#d1d1d1] ">
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
    alignContent: "center",
    justifyContent: "center",
    height: 550,
  },
  image: {
    alignContent: "center",
    justifyContent: "center",
  },
  text: {},
});
