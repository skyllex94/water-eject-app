import { View, Text, TouchableOpacity, Button, Alert } from "react-native";

const DecibelInfo = ({
  sampleRate,
  setSampleRate,
  audioQuality,
  setAudioQuality,
  audioEncoding,
  setAudioEncoding,
}) => {
  function changeSampleRate() {
    const title = "Change sample rate";
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
    const title = "Change audio quality";
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

  function changeFileFormat() {
    const title = "Change file format";
    const message =
      "Sound quality is typically an assessment of the accuracy, fidelity, or intelligibility of audio output from an electronic device.";
    const buttons = [
      {
        text: ".aac (Default)",
        onPress: () => setAudioEncoding("aac"),
      },
      {
        text: ".amr",
        onPress: () => setAudioEncoding("amr"),
      },
      {
        text: ".ima4",
        onPress: () => setAudioEncoding("ima4"),
      },
      {
        text: ".mp2",
        onPress: () => setAudioEncoding("mp2"),
      },
      { text: "Cancel", type: "cancel" },
    ];
    Alert.alert(title, message, buttons);
  }

  return (
    <View className="bg-[#101C43] mx-3 rounded-xl py-3">
      <View className="flex-row items-center justify-between mx-4">
        <View className="flex-row">
          <Text className="text-white mx-2">Sample Rate:</Text>
          <Text className="text-white">{sampleRate}</Text>
        </View>

        <TouchableOpacity>
          <Button title="Change" onPress={changeSampleRate}></Button>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mx-4">
        <View className="flex-row">
          <Text className="text-white mx-2">Audio Quality:</Text>
          <Text className="text-white">{audioQuality}</Text>
        </View>

        <TouchableOpacity>
          <Button title="Change" onPress={changeAudioQuality} />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between mx-4">
        <View className="flex-row">
          <Text className="text-white mx-2">Audio File Format:</Text>
          <Text className="text-white">.{audioEncoding}</Text>
        </View>

        <TouchableOpacity>
          <Button title="Change" onPress={changeFileFormat} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DecibelInfo;
