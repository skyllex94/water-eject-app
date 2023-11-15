import { View } from "react-native";
import SpeakersProgram from "./SpeakersProgram";

export default function Programs({ navigation }) {
  return (
    <View className="flex-3 bg-[#101C43] my-4 mx-3 rounded-xl">
      <SpeakersProgram navigation={navigation} />
      <SpeakersProgram navigation={navigation} />
    </View>
  );
}
