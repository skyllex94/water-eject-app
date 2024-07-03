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
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";

export default function OnBoardingItem({ item, navigation }) {
  const { width } = useWindowDimensions();

  async function navigatingIntoApp() {
    try {
      await AsyncStorage.setItem("@isAppFirstLaunched", "false");
    } catch (err) {
      console.log(err);
    } finally {
      navigation.replace("MainApp");
      if (await StoreReview.hasAction()) {
        setTimeout(() => {
          StoreReview.requestReview();
        }, 20000);
      }
    }
  }

  return (
    <SafeAreaView style={[styles.container, { width }]}>
      {item.id === 5 ? (
        <View className="flex-1 m-5 space-y-0">
          <TouchableOpacity
            className="flex-row justify-end"
            onPress={navigatingIntoApp}
          >
            <AntDesign name="close" size={24} color="#05103A" />
          </TouchableOpacity>

          <View className="flex-1 justify-center">
            <View className="">
              <Text className="text-2xl text-center uppercase text-white font-bold mb-5">
                Start Your Trial
              </Text>

              <Text className="text-center text-white mb-5">
                Upgrade to Pro membership to access all features.
              </Text>

              <View className="items-center">
                <MaterialCommunityIcons
                  name="trophy-award"
                  size={96}
                  color="#E5962D"
                />
              </View>
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
                    Tests, Speaker Isolation, Stereo Imaging Test and more to
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
        </View>
      ) : (
        <View>
          <View className="items-center justify-center">
            <Image
              resizeMode="contain"
              source={item.image}
              style={[styles.image, { width: width - 50, height: 250 }]}
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
