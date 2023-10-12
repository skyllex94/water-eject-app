import { Text, View } from "react-native";
import BassTestSound1 from "./BassTestSound1";
import BassTestSound2 from "./BassTestSound2";
import useRevenueCat from "../../../hooks/useRevenueCat";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BassTest({ navigation }) {
  const { isProMember } = useRevenueCat();

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 mt-4">
      <View className="flex-row items-center m-5">
        {!isProMember && (
          <View className="mr-2">
            <FontAwesome5 name="lock" size={18} color="white" />
          </View>
        )}
        <Text className="text-white">Bass Accuracy</Text>
      </View>

      <BassTestSound1 navigation={navigation} />
      <BassTestSound2 navigation={navigation} />
    </View>
  );
}
