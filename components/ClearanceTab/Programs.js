import { View } from "react-native";
import SpeakersProgram from "./SpeakersProgram";
import ReceiverProgram from "./ReceiverProgram";
import AirPodsProgram from "./AirPodsProgram";

export default function Programs({ navigation }) {
  return (
    <View className="flex-3 bg-[#101C43] my-4 mx-3 rounded-xl">
      <SpeakersProgram navigation={navigation} />
      <ReceiverProgram navigation={navigation} />
      <AirPodsProgram navigation={navigation} />
    </View>
  );
}
