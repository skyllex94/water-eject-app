import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";

const DecibelControls = ({ startDecibelMetering, stopDecibelMetering }) => {
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center h-24">
        <TouchableOpacity
          className="bg-[#343c5b] justify-center h-16 w-36 rounded-xl"
          onPress={() => startDecibelMetering()}
        >
          <Text className="text-white text-center text-xl">Start Measure</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#1b1d22] justify-center h-16 w-16 ml-4 rounded-xl"
          onPress={() => stopDecibelMetering()}
        >
          <Text className="text-white text-center text-xl">Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DecibelControls;
