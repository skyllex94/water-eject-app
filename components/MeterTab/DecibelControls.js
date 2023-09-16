import { Image } from "react-native";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import highFreq from "../../assets/icons/dec_icon.png";

const DecibelControls = ({
  startDecibelMetering,
  stopDecibelMetering,
  isOnMetering,
  setIsOnMetering,
}) => {
  function startStopMetering() {
    if (!isOnMetering) startDecibelMetering();
    else stopDecibelMetering();

    setIsOnMetering((curr) => !curr);
  }

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center my-8">
        <TouchableOpacity
          className={`${
            isOnMetering ? "bg-[#4AD0EE]" : "bg-[#101C43]"
          }  justify-center h-20 rounded-xl`}
          onPress={() => startStopMetering()}
        >
          <View className="flex-1 justify-center my-4">
            <View className="flex-row items-center mx-4">
              <View
                className={` ${
                  isOnMetering ? "bg-[#87e5fa] " : "bg-[#05103A]"
                }  w-12 h-12 mr-2 items-center justify-center rounded-xl`}
              >
                <Image className="w-10 h-10" source={highFreq} />
              </View>
              <Text className="text-white text-center text-xl">
                Start Metering
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#101C43] justify-center h-20 w-20 ml-4 rounded-xl"
          onPress={() => stopDecibelMetering()}
        >
          <Text className="text-white text-center text-xl">Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DecibelControls;
