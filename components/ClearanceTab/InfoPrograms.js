import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function InfoPrograms({ navigation }) {
  const [loadedGif, setLoadedGif] = useState(false);

  return (
    <View className="bg-[#142251] flex-1 p-5 ">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl text-white my-3">
          Dedicated Frequency Programs
        </Text>
        <TouchableOpacity
          className="items-center justify-center p-2 bg-[#111c42] h-11 w-11 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-white font-extralight mb-2">
        Our programs are made with the specific reason for ejecting water out of
        the speakers of your phone. The difference between them and the static
        frequencies is that we are using ALTERNATING frequencies in order to
        more effectively remove all the water stuck in the speakers.
      </Text>

      <Text className="text-white font-extralight my-2">
        The first 8-minutes "Preparation Program" is meant to prepare your
        speakers. It uses booming sounds in order to drive the water droplets
        further out of the mesh of the speakers. The rumbling sound is a low
        level vibration which will drive forward the majority of the water
        deeper inside the speakers.
      </Text>

      <Text className="text-white font-extralight my-2">
        The second 16-minutes "Water Clearance Program" is the main program for
        removing all the water in your speakers. Just like the prep program, it
        uses alternating frequencies to dynamically change the sound going out
        of the speakers and as a result get a lot more of the water out.
      </Text>

      {loadedGif && (
        <ActivityIndicator className="h-[200px] justify-center" size="large" />
      )}

      <Image
        className={`${setLoadedGif && "h-[200px]"} w-[100%] rounded-xl my-2`}
        source={require("../../assets/images/clearance/water-eject.gif")}
        onLoadStart={() => setLoadedGif(true)}
        onLoadEnd={() => setLoadedGif(false)}
      />

      {!loadedGif && (
        <View className="flex-row items-center my-2">
          <View className="h-[90%] w-[1px] bg-white mx-2 " />

          <Text className="text-white font-light mx-2">
            Play both programs once, one after the other white placing your
            phone display down, and increase the volume to about 80-90%.
          </Text>
        </View>
      )}
    </View>
  );
}
