import { Image } from "react-native";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import highFreq from "../../assets/icons/dec_icon.png";
import useRevenueCat from "../../hooks/useRevenueCat";
import {
  openPurchaseModal,
  startDBMetering,
  stopDBMetering,
} from "../Utils/Funcs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { Context } from "../../contexts/Context";

const DecibelControls = ({ navigation, setCurrDecibels }) => {
  const { isProMember } = useRevenueCat();
  const { recording, setRecording } = useContext(Context);

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center mx-5 mt-4 mb-10">
        <TouchableOpacity
          className={`bg-[#101C43] justify-center h-20 w-3/4 rounded-xl`}
          onPress={
            isProMember
              ? () => startDBMetering(setRecording, setCurrDecibels)
              : () => openPurchaseModal(navigation)
          }
        >
          <View className="flex-1 justify-center my-4">
            <View className="flex-row items-center mx-4">
              <View className="bg-[#05103A] w-12 h-12 mr-2 items-center justify-center rounded-xl">
                {isProMember ? (
                  <Image className="w-10 h-10" source={highFreq} />
                ) : (
                  <View className="items-center justify-center">
                    <FontAwesome5 name="lock" size={24} color="white" />
                  </View>
                )}
              </View>
              <Text className="text-white text-xl">Start Metering</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#101C43] justify-center h-20 w-1/4 ml-4 rounded-xl"
          onPress={() => stopDBMetering(recording, setRecording)}
        >
          <Text className="text-white text-center text-xl">Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DecibelControls;
