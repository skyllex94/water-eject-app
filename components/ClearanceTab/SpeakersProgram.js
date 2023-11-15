import { View, Text, Image, TouchableOpacity } from "react-native";
import MainProgram from "./MainProgram";
import PrepProgram from "./PrepProgram";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SpeakersProgram({ navigation }) {
  return (
    <View className="bg-[#05103A] rounded-xl m-3 pb-3">
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center justify-start">
          <View className="items-center justify-center h-12 w-28">
            <Image
              resizeMode="contain"
              className="rounded-md h-[35px]"
              source={require("../../assets/images/clearance/icon_iphone_speaker.png")}
            />
          </View>

          <Text className="text-white">Phone Speaker Clearance </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("InfoPrograms")}
          className="bg-[#101C43] items-center justify-center h-8 w-8 mr-3 rounded-md"
        >
          <FontAwesome5 name="info" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <PrepProgram navigation={navigation} />
      <MainProgram navigation={navigation} />
    </View>
  );
}
