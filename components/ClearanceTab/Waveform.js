import { View } from "react-native";

export default function Waveform({ waveform, progress }) {
  return (
    <View className="flex-row items-center gap-1">
      {waveform.map((line, idx) => {
        return (
          <View
            key={idx}
            className={`flex-1  rounded-md`}
            style={{
              height: line,
              backgroundColor: progress / 3 > idx ? "#277a8c" : "white",
            }}
          />
        );
      })}
    </View>
  );
}
