import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import PrepProgram from "../PrepProgram";
import { bgColor } from "../../styles/ColorsUI";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import SystemSetting from "react-native-system-setting";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PlayingProgram({ navigation }) {
  const { currStatusPrep } = useContext(PlayerContext);
  const [currVolume, setCurrVolume] = useState(0);

  // Update volume percentage amount
  useEffect(() => {
    setInterval(() => {
      SystemSetting.getVolume().then((currentVolume) =>
        setCurrVolume(currentVolume)
      );
    }, 1500);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        className={`bg-[${bgColor}] items-center justify-center p-2 h-11 w-11 mx-3 rounded-xl`}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-white text-xl">
          Playing Selected Program...
        </Text>

        <Text className="text-center text-white font-extralight">
          Place your phone display down as the program is playing.
        </Text>
        <Text className="text-center text-white font-extralight">
          Have your volume level between 85% and 95%.
        </Text>

        <Image
          className={`bg-[${bgColor}] rounded-xl w-[95%] h-[40%] my-4`}
          resizeMode="contain"
          source={require("../../assets/images/clearance/iphone_placement_final.gif")}
        />

        <View className={`bg-[${bgColor}] w-[95%] rounded-xl`}>
          {currStatusPrep.status ===
          "not-playing" ? null : currStatusPrep.status === "playing" ? (
            <ActivityIndicator
              className={`bg-[${bgColor}] mt-5 mb-2 rounded-xl`}
              size="large"
            />
          ) : null}

          <View
            className={`flex-row items-center justify-center mt-3 mb-1`}
            size="large"
          >
            <Text className="text-center text-white font-extralight mr-4">
              Current Status:
            </Text>

            <Text className="text-center text-white font-extralight">
              {currStatusPrep.status === "not-playing"
                ? "Stopped / Not Playing"
                : currStatusPrep.status === "playing"
                ? "Playing Program"
                : "Finished Program"}
            </Text>
          </View>
          <View
            className={`flex-row items-center justify-center mt-1 mb-3`}
            size="large"
          >
            <Text className="text-center text-white font-extralight mr-4">
              Current Volume Level:
            </Text>

            <Text className="text-center text-white font-extralight">
              {currVolume * 100}%
            </Text>
          </View>
        </View>

        <PrepProgram navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
