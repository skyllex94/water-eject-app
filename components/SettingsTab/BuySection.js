import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import useRevenueCat from "../../hooks/useRevenueCat";
import { openPurchaseModal } from "../util/Funcs";

export default function BuySection({ navigation }) {
  const { isProMember } = useRevenueCat();

  return (
    <View className="items-center">
      <TouchableOpacity
        onPress={!isProMember && (() => openPurchaseModal(navigation))}
        className={`${
          isProMember && "hidden"
        }  bg-[#101C43]  justify-center my-5 h-12 w-[95%] rounded-lg`}
      >
        <View className="flex-row items-center ml-5">
          <View className="mr-2">
            <FontAwesome5 name="crown" size={24} color="white" />
          </View>
          <Text className="text-white text-lg">Buy Pro Version</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
