import React, { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import SoundCloudWaveform from "react-native-soundcloud-waveform";

export default function SoundCloudWave({
  currentTime,
  totalTime,
  waveform,
  height,
}) {
  const [time, setTime] = useState(243);
  const width = useWindowDimensions();

  return (
    <TouchableOpacity disabled={true}>
      <SoundCloudWaveform
        onPress={() => enableFreq}
        waveformUrl={waveform}
        height={height ?? 25}
        width={width.width - 130}
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
