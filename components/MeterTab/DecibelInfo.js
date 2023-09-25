import { useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const DecibelInfo = ({
  sampleRate,
  setSampleRate,
  audioQuality,
  setAudioQuality,
  audioEncodingBitRate,
  setAudioEncodingBitRate,
}) => {
  const [openOptions, setOpenOptions] = useState(true);

  function changeSampleRate() {
    const title = "Change Sample Rate";
    const message =
      "Sampling rate determines the sound frequency range (corresponding to pitch) which can be represented in the digital waveform. ";
    const buttons = [
      {
        text: "22 kHz (Default)",
        onPress: () => setSampleRate(22050),
      },
      {
        text: "11 kHz",
        onPress: () => setSampleRate(11025),
      },
      {
        text: "44.1 kHz",
        onPress: () => setSampleRate(44100),
      },

      { text: "Cancel", type: "cancel" },
    ];
    Alert.alert(title, message, buttons);
  }

  function changeAudioQuality() {
    const title = "Change Audio Quality";
    const message =
      "Sound quality is typically an assessment of the accuracy, fidelity, or intelligibility of audio output from an electronic device.";
    const buttons = [
      {
        text: "Low (Default)",
        onPress: () => setAudioQuality("Low"),
      },
      {
        text: "Medium",
        onPress: () => setAudioQuality("Medium"),
      },
      {
        text: "High",
        onPress: () => setAudioQuality("High"),
      },

      { text: "Cancel", type: "cancel" },
    ];
    Alert.alert(title, message, buttons);
  }

  function changeAudioEncodingBitRate() {
    const title = "Change Audio Encoding Bit Rate";
    const message =
      "Bitrate is the term used to describe the amount of data being transferred into audio. A higher bitrate generally means better audio quality.";
    const buttons = [
      {
        text: "32 bits (Default)",
        onPress: () => setAudioEncodingBitRate(32),
      },
      {
        text: "64 bits",
        onPress: () => setAudioEncodingBitRate(64),
      },
      { text: "Cancel", type: "cancel" },
    ];
    Alert.alert(title, message, buttons);
  }

  return (
    <View className="bg-[#101C43] mx-3 rounded-xl py-3">
      <View className="flex-row items-center justify-between mx-3 mb-1">
        <View className="flex-row">
          <Text className="text-white mx-2">Sound Options</Text>
        </View>

        <TouchableOpacity
          onPress={() => setOpenOptions((state) => !state)}
          className="h-10 w-12 rounded-xl items-center justify-center"
        >
          {openOptions ? (
            <Entypo name="chevron-up" size={24} color="white" />
          ) : (
            <Entypo name="chevron-down" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <View className={openOptions ? null : "hidden"}>
        <View className="flex-row items-center justify-between mx-4">
          <View className="flex-row ">
            <Text className="text-white mx-2">Sample Rate:</Text>
            <Text className="text-white">{sampleRate} Hz</Text>
          </View>

          <TouchableOpacity className="bg-[#05103A] h-10 w-10 mb-1 items-center justify-center rounded-lg">
            <SimpleLineIcons
              name="options"
              size={24}
              color="white"
              onPress={changeSampleRate}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mx-4">
          <View className="flex-row">
            <Text className="text-white mx-2">Audio Quality:</Text>
            <Text className="text-white">{audioQuality}</Text>
          </View>

          <TouchableOpacity className="bg-[#05103A] h-10 w-10 mb-1 items-center justify-center rounded-lg">
            <SimpleLineIcons
              name="options"
              size={24}
              color="white"
              onPress={changeAudioQuality}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mx-4">
          <View className="flex-row">
            <Text className="text-white mx-2">Audio Encoding Bit Rate:</Text>
            <Text className="text-white">{audioEncodingBitRate} bits</Text>
          </View>

          <TouchableOpacity className="bg-[#05103A] h-10 w-10 items-center justify-center rounded-lg">
            <SimpleLineIcons
              name="options"
              size={24}
              color="white"
              onPress={changeAudioEncodingBitRate}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DecibelInfo;
