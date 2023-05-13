import React, { useState } from "react";
import { ReactDOM } from "react";

import Waveform from "react-audio-waveform";
import { View } from "react-native";

const TEST_PEAKS = [
  0.04, 0.99, 0.54, 0.74, 0.76, 0.52, 0.79, 0.72, 0.83, 0.67, 0.88, 0.99, 0.95,
  0.9399999999999999, 0.91, 0.82, 0.96, 0.91, 0.93, 0.93, 0.98, 0.99, 0.98,
  0.99, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.85, 0.82, 0.96, 0.99, 0.99,
  0.99, 0.97, 0.97, 0.98, 1, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.98, 0.98,
  0.98, 0.99, 0.98, 0.99, 0.99, 0.98, 0.99, 0.9, 0.8, 0.91, 0.9, 0.88, 0.97,
  0.98, 0.92, 0.98, 0.98, 0.99, 0.99, 0.98, 0.99, 0.99, 0.98, 0.98, 0.97, 0.98,
  0.98, 0.98, 0.99, 0.99, 0.98, 0.99, 0.98, 0.99, 0.99, 0.98, 0.99, 0.98, 0.98,
  0.99, 0.99, 0.98, 0.99, 0.99, 1, 0.99, 0.93, 0.96, 0.83, 0.9399999999999999,
  0.98, 0,
];

export default function Wavey() {
  const [secs, setSecs] = useState({ pos: 0 });

  const handleClick = (secs) => {
    setSecs(secs);
  };

  return (
    <View className="App">
      <View style={{ transform: [{ scaleY: 2 }] }}>
        <Waveform
          barWidth={1}
          peaks={TEST_PEAKS}
          height={100}
          pos={secs.pos}
          duration={210}
          onClick={() => handleClick(secs)}
          color="red"
          progressColor="#252525"
          transitionDuration={300}
          progressGradientColors={[
            [0, "#888"],
            [1, "#aaa"],
          ]}
        />
      </View>
    </View>
  );
}
