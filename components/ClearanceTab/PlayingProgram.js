import {
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  View,
} from "react-native";
import PrepProgram from "../PrepProgram";

export default function PlayingProgram({ navigation }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-center text-white text-xl">
        Playing Selected Program...
      </Text>

      <Text className="text-center text-white">
        Place your phone display down as the program is playing.
      </Text>
      <ActivityIndicator className="my-3" size="large" />

      <Image
        className={`rounded-xl w-[90%] h-[40%] mt-10`}
        resizeMode="contain"
        source={require("../../assets/images/clearance/position3.gif")}
      />

      <PrepProgram navigation={navigation} />
    </SafeAreaView>
  );
}
