import { Text, TouchableOpacity, View } from "react-native";

import MainProgram from "./MainProgram";
import PrepProgram from "./PrepProgram";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Programs({ navigation }) {
  return (
    <View className="flex-3 bg-[#101C43] my-4 pb-4 mx-3 rounded-xl">
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-white font-bold ml-4">
          Dedicated Clearance Programs
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("InfoPrograms")}
          className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <PrepProgram navigation={navigation} />
      <MainProgram navigation={navigation} />
    </View>
  );
}
