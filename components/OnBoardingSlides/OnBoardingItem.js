import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function OnBoardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, { width }]}>
      {item.id === 5 ? (
        <View className="m-5 space-y-0  ">
          <Text className="text-2xl text-center uppercase text-white font-bold mb-5">
            Upgrade
          </Text>

          <Text className="text-center text-white mb-5">
            Upgrade to Pro membership to access all features.
          </Text>

          <TouchableOpacity
            className="absolute top-0 right-0"
            // onPress={navigation.goBack}
          >
            <Ionicons name="md-close-circle-sharp" size={32} color="#E5962D" />
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
                  Access to All Pro Features
                </Text>
                <Text className="text-white text-sm font-extralight">
                  Access to our frequency programs and ongoing frequency
                  development for water, dust and fine-speakers (Airpods)
                  frequency programs.
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
                  Included 15+ Sound Tests: Bass Accuracy Test, Polarity Tests,
                  Speaker Isolation, Sterio Imaging Test and more to come.
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
                  additional ones on a regular basis to give better, faster and
                  diverse results.
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
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
        </View>
      )}
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
