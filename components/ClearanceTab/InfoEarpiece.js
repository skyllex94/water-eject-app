import { Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function InfoEarpiece({ navigation }) {
  return (
    <View className="bg-[#142251] flex-1 p-5">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">
          Earpiece Frequency Program
        </Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white font-extralight mb-2">
        The Earpiece speaker, also known as the receiver, is the speaker located
        at the top of the phone where the notch or dynamic island is.
      </Text>

      <Text className="text-white font-extralight my-2">
        The Booming program is highly-aggressive booming frequency sound where
        the majority of the music is coming from the receiver speaker. It is
        loud and thumping in order to eject the stuck water droplets deep inside
        the speaker.
      </Text>

      <Text className="text-white font-extralight my-2">
        With this program you can even remove some excess dust stuck inside.
        Make sure you increase the volume of the speaker to at least 80% to
        create the force to remove the droplets. In addition to this leave your
        phone facing down for the gravity to help out with the process.
      </Text>

      <Image
        className={`h-[200px] w-[100%] rounded-xl my-2`}
        source={require("../../assets/images/clearance/earpiece_speaker.jpg")}
      />

      <View className="flex-row items-center my-2">
        <View className="h-[90%] w-[1px] bg-white mx-2 " />

        <Text className="text-white font-light mx-2">
          Play the booming sound at least once and leave your phone facing down
          as it's playing.
        </Text>
      </View>
    </View>
  );
}
