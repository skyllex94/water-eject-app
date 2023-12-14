import { View } from "react-native";

export default function NewWaveform({ progress }) {
  const waveData = [
    18, 17, 20, 23, 10, 20, 5, 18, 15, 25, 15, 18, 17, 20, 23, 10, 20, 8, 18,
    15, 25, 15, 20, 23, 10, 20, 8, 18, 15, 25, 15, 15, 10,
  ];

  return (
    <View className="flex-row items-center gap-1">
      {waveData.map((line, idx) => {
        return (
          <View
            key={idx}
            className={`flex-1  rounded-md`}
            style={{
              height: line,
              backgroundColor: progress / 3 > idx ? "lightblue" : "gray",
            }}
          />
        );
      })}
    </View>
  );
}
