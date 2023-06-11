import React, { Component, useState } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import SoundCloudWaveform from "react-native-soundcloud-waveform";

export default function SoundCloudWave() {
  const [time, setTime] = useState(243);
  const currentTime = 0.2;

  return (
    <View>
      <SoundCloudWaveform
        waveformUrl={require(`../assets/programs/prep.mp3`)}
        percentPlayable={0}
        percentPlayed={currentTime}
        setTime={setTime}
      />
    </View>
  );
}
