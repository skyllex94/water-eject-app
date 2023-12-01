import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EarProgram from "./EarProgram";
import { bgColor, buttonsColor } from "../../constants/ColorsUI";

import PrepProgram from "./PrepProgram";
import MainProgram from "./MainProgram";
import PodsProgram from "./PodsProgram";

export default function Programs({ navigation }) {
  const programs = [
    {
      name: "Speaker Clearance",
      icon: require("../../assets/images/clearance/speaker.png"),
      info: "InfoPrograms",
      program: [
        <PrepProgram key={"prep"} navigation={navigation} />,
        <MainProgram key={"main"} navigation={navigation} />,
      ],
    },
    {
      name: "Earpiece Clearance",
      icon: require("../../assets/images/clearance/receiver.png"),
      info: "InfoEarpiece",
      program: [<EarProgram key={"ear"} navigation={navigation} />],
    },
    {
      name: "AirPods Clearance",
      icon: require("../../assets/images/clearance/airpods.png"),
      info: "InfoPods",
      program: [<PodsProgram key={"pods"} navigation={navigation} />],
    },
  ];

  return (
    <View className="my-2">
      {programs.map((curr, idx) => (
        <View
          key={idx}
          className={`bg-[${buttonsColor}] rounded-xl mx-3 my-2 pb-3`}
        >
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center justify-start">
              <View className="items-center justify-center h-12 w-28">
                <Image
                  resizeMode="contain"
                  className="rounded-md h-[35px]"
                  source={curr.icon}
                />
              </View>

              <Text className="text-white font-bold">{curr.name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(curr.info)}
              className={`bg-[${bgColor}] items-center justify-center h-8 w-8 mr-3 rounded-md`}
            >
              <FontAwesome5 name="info" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {curr.program}
        </View>
      ))}
    </View>
  );
}
