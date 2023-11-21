import { Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function InfoPods({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">
          AirPods Clearance Program
        </Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white font-extralight mb-2">
        Our AirPods program is a dedicated lightly-alternating program which
        uses high-intensity frequencies taylored for removing water out on your
        earbuds.
      </Text>

      <Text className="text-white font-extralight my-2">
        This program apposed to the other ones is relatively static with slight
        alternations in the frequency played. The intention is to keep a very
        steady and similar vibration through the duration of the program. Over
        the course of it you should start seeing some of the water droplets
        starting to come out in a slow manner our of the net of the AirPods.
      </Text>
      <Image
        className={`h-[200px] w-[100%] rounded-xl my-2`}
        source={require("../../../assets/images/clearance/airpods_water.jpg")}
      />

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2" />

        <Text className="text-white font-light mx-2">
          Connect your Airpods and Keep them in a sligthly tilted position with
          the speakers pointing down. Increase the volume to at least 90% and go
          through the program at least once.
        </Text>
      </View>
    </View>
  );
}
