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
      <Image
        resizeMode="contain"
        source={item.image}
        style={[styles.image, { width }]}
      />

      <View style={styles.text}>
        <Text className="font-bold text-center text-[28px] px-4 mb-3 text-[#493d8a] ">
          {item.title}
        </Text>
        <Text className="font-light text-center px-8 text-[#62656b]">
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
  },
  image: {
    flex: 0.5,
    justifyContent: "center",
  },
  text: {
    flex: 0.2,
  },
});
