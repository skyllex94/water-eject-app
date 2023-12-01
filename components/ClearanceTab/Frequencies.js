import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { Audio } from "expo-av";

import { buttonsColor } from "../../constants/ColorsUI";
import { Context } from "../../contexts/Context";
import { useContext } from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultVisualizerParams } from "../../constants/Constants";
import {
  bgColor,
  activeColor,
  iconActiveColor,
} from "../../constants/ColorsUI";

import { stopDBMetering } from "../Utils/Funcs";
export default function Frequencies({ navigation }) {
  const {
    currSound,
    setCurrSound,
    setVisualizerParams,
    sound,
    setSound,
    recording,
    setRecording,
  } = useContext(Context);

  const frequencies = [
    {
      name: "120 Hz",
      objName: "isEnabled120",
      icon: require("../../assets/icons/lowfreqIcon.png"),
      file: require(`../../assets/frequencies/lowesthz.mp3`),
      visualizerParams: { speed: 125, frequency: 5, amplitude: 105 },
    },
    {
      name: "160 Hz",
      objName: "isEnabled160",
      icon: require("../../assets/icons/medfreqIcon.png"),
      file: require(`../../assets/frequencies/lowhz.mp3`),
      visualizerParams: { speed: 105, frequency: 8, amplitude: 155 },
    },
    {
      name: "300 Hz",
      objName: "isEnabled300",
      icon: require("../../assets/icons/highfreqIcon.png"),
      file: require(`../../assets/frequencies/mediumhz.mp3`),
      visualizerParams: { speed: 85, frequency: 12, amplitude: 175 },
    },
    {
      name: "500 Hz",
      objName: "isEnabled500",
      icon: require("../../assets/icons/xthighfreqIcon.png"),
      file: require(`../../assets/frequencies/highhz.mp3`),
      visualizerParams: { speed: 75, frequency: 17, amplitude: 200 },
    },
  ];

  async function enableCurrFreq(item) {
    setSound((state) => ({
      ...!state,
      [item.objName]: !sound[item.objName],
    }));
    stopDBMetering(recording, setRecording);
    unloadSound();

    startFrequency(item);
  }

  async function startFrequency(item) {
    if (!sound[item.objName]) {
      const { sound } = await Audio.Sound.createAsync(item.file, {
        isLooping: true,
      });

      // Start the currently loaded sound
      setCurrSound(sound);

      // Sound Visualizer paramethers change
      setVisualizerParams(item.visualizerParams);

      sound.playAsync();
    } else {
      unloadSound();
      setVisualizerParams(defaultVisualizerParams);
    }
  }

  async function unloadSound() {
    if (currSound) currSound.unloadAsync() || undefined;
  }

  return (
    <View className="flex-3 justify-center">
      <View className={`bg-[${buttonsColor}] mx-3 pb-3 rounded-xl`}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center ml-6">
            <MaterialCommunityIcons name="wave" size={60} color="white" />
            <Text className="text-white font-bold ml-4 my-5">
              Helpful Frequencies
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("InfoFrequencies")}
            className="bg-[#05103A] items-center justify-center h-8 w-8 mr-3 rounded-md"
          >
            <FontAwesome5 name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-center">
          {frequencies.map((curr, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => enableCurrFreq(curr)}
              className={`justify-center rounded-2xl w-[45%] m-[7px] h-[120px] p-[10px] ${
                sound[curr.objName] ? `bg-[${activeColor}]` : `bg-[${bgColor}]`
              }`}
            >
              <View className="flex-row items-center">
                <View
                  className={`w-[50px] p-[10px] rounded-xl ${
                    sound[curr.objName]
                      ? `bg-[${iconActiveColor}]`
                      : `bg-[${buttonsColor}]`
                  }`}
                >
                  <Image className="w-[30px] h-[30px]" source={curr.icon} />
                </View>
                <Text className="font-bold text-white ml-[10px]">
                  {curr.name}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mt-[10px]">
                <Text className="font-bold text-white ml-[5px]">
                  {sound[curr.objName] ? "On" : "Off"}
                </Text>
                <Switch
                  trackColor={{ true: iconActiveColor }}
                  value={sound[curr.objName]}
                  onValueChange={() => enableCurrFreq(curr)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
