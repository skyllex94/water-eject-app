import { Text, View } from "react-native";

import MainProgram from "./MainProgram";
import PrepProgram from "./PrepProgram";

export default function Programs({ navigation }) {
  return (
    <View className="flex-3 bg-[#101C43] my-4 mx-3 pb-3 rounded-xl">
      <Text className="text-white font-bold ml-4 mt-4">
        Dedicated Clearance Programs
      </Text>
      <PrepProgram navigation={navigation} />
      <MainProgram navigation={navigation} />
    </View>
  );
}
