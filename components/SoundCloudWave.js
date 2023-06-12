import React, { useState } from "react";
import { View } from "react-native";

import SoundCloudWaveform from "react-native-soundcloud-waveform";

export default function SoundCloudWave({ currentTime, totalTime }) {
  console.log("currentTime:", currentTime);
  const [time, setTime] = useState(243);

  return (
    <SoundCloudWaveform
      className="m-0 p-0"
      waveformUrl={"https://w1.sndcdn.com/PP3Eb34ToNki_m.png"}
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
  );
}
