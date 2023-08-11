import { Text, SafeAreaView } from "react-native";
import React from "react";
import MorphingCircle from "../components/MorphingCircle";
import { useEffect } from "react";

import { Permissions } from "../components/AppPermissions";

export default function MeterScreen() {
  useEffect(() => {
    Permissions.checkPermission();

    if (Permissions.checkPermissions === "GRANTED")
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#05103A]">
      <Text className="text-white text-center text-xl">Decibel Meter</Text>
      <MorphingCircle />
    </SafeAreaView>
  );
}
