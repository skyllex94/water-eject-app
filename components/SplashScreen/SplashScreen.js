import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-[#05103A] items-center justify-center">
      <LottieView
        autoPlay
        style={{ width: 400, height: 400 }}
        source={require("./waterdrop.json")}
      />
      <Text className={`text-white font-bold text-4xl absolute bottom-96`}>
        WaterDrop
      </Text>
    </View>
  );
}
