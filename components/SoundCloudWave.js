import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

import SoundCloudWaveform from "react-native-soundcloud-waveform";

export default function SoundCloudWave({ currentTime, totalTime, waveform }) {
  const [time, setTime] = useState(243);

  return (
    <TouchableOpacity disabled={true}>
      <SoundCloudWaveform
        onPress={() => enableFreq}
        className="m-0 p-0 "
        waveformUrl={waveform}
        height={25}
        width={320}
        inactive="#E5E4E2"
        inactiveInverse="white"
        active="#277a8c"
        activeInverse="#3DA3BA"
        activePlayable="#05103A"
        percentPlayable={0}
        percentPlayed={(currentTime ?? 0) / totalTime}
        setTime={setTime}
      />
    </TouchableOpacity>
  );
}
