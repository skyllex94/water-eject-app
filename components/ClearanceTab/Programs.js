import { View } from "react-native";
import SpeakersProgram from "./SpeakersProgram";
import EarpieceProgram from "./EarpieceProgram";
import AirPodsProgram from "./AirPodsProgram";

export default function Programs({ navigation }) {
  return (
    <View>
      <SpeakersProgram navigation={navigation} />
      <EarpieceProgram navigation={navigation} />
      <AirPodsProgram navigation={navigation} />
    </View>
  );
}
