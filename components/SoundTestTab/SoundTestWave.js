import React from "react";
import { TouchableOpacity } from "react-native";

import SoundCloudWaveform from "react-native-soundcloud-waveform";

export default function SoundTestWave({ currentTime, totalTime, waveform }) {
  const setTime = 0;
  return (
    <TouchableOpacity disabled={true}>
      <SoundCloudWaveform
        waveformUrl={waveform}
        height={25}
        width={380} // find out a way to make it dynamic value
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
