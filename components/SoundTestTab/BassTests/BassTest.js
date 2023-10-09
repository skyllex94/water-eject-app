import { Text, View } from "react-native";
import BassTestSound1 from "./BassTestSound1";
import BassTestSound2 from "./BassTestSound2";

export default function BassTest() {
  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <Text className="text-white ml-3 m-5">Bass Accuracy</Text>

      <BassTestSound1 />
      <BassTestSound2 />
    </View>
  );
}
