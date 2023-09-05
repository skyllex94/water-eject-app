import { Image, Switch } from "react-native";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import highFreq from "../../assets/icons/dec_icon.png";

const DecibelControls = ({
  startDecibelMetering,
  stopDecibelMetering,
  isOnMetering,
  setIsOnMetering,
}) => {
  function updateNewDecibelStateValue() {
    setIsOnMetering((curr) => !curr);
  }

  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center my-4">
        <TouchableOpacity
          className="bg-[#101C43] justify-center h-28 rounded-xl"
          onPress={() => startDecibelMetering()}
        >
          <View className="flex-1 justify-center my-4">
            <View className="flex-row items-center mx-4">
              <View className="bg-[#05103A] w-12 h-12 mr-2 items-center justify-center rounded-xl">
                <Image className="w-10 h-10" source={highFreq} />
              </View>
              <Text className="text-white text-center text-xl">
                Start Metering
              </Text>
            </View>

            <View className="flex-row mx-4 justify-between">
              <Text className="text-white text-center text-xl">On</Text>
              <Switch
                trackColor={{ true: "#05103A" }}
                value={isOnMetering}
                onValueChange={updateNewDecibelStateValue}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#101C43] justify-center h-16 w-16 mb-6 ml-4 rounded-xl"
          onPress={() => stopDecibelMetering()}
        >
          <Text className="text-white text-center text-xl">Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DecibelControls;
