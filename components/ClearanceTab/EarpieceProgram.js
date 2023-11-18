import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EarProgram from "./EarProgram";
import { bgColor, buttonsColor } from "../../constants/ColorsUI";

export default function EarpieceProgram({ navigation }) {
  return (
    <View className={`bg-[${buttonsColor}] rounded-xl mx-3 mb-4 pb-3`}>
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center justify-start">
          <View className="items-center justify-center h-12 w-28">
            <Image
              resizeMode="contain"
              className="rounded-md h-[35px]"
              source={require("../../assets/images/clearance/receiver.png")}
            />
          </View>

          <Text className="text-white">Earpiece Clearance</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("InfoPrograms")}
          className={`bg-[${bgColor}] items-center justify-center h-8 w-8 mr-3 rounded-md`}
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <EarProgram navigation={navigation} />
    </View>
  );
}
