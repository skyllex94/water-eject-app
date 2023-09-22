import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { spline } from "@georgedoescode/spline";

import {
  Canvas,
  LinearGradient,
  Path,
  useClockValue,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { createNoise2D } from "simplex-noise";
import { useState } from "react";

function createPoints() {
  const points = [];
  // how many points do we need
  const numPoints = 8;
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / numPoints;
  // the radius of the circle
  const rad = 190;

  for (let i = 1; i <= numPoints; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 210 + Math.cos(theta) * rad;
    const y = 210 + Math.sin(theta) * rad;

    // store the point
    points.push({
      x: x,
      y: y,
      /* we need to keep a reference to the point's original {x, y} coordinates
       for when we modulate the values later */
      originX: x,
      originY: y,
      // more on this in a moment!
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return points;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const MorphingCircle = ({ currDecibels }) => {
  const clock = useClockValue();
  const points = useValue(createPoints());
  const hueNoiseOffset = useValue(0);
  const noise = createNoise2D();
  const noiseStep = currDecibels < 40 ? 0.005 : currDecibels; // 0.005 default
  console.log(noiseStep);

  const [minDecibels, setMinDecibels] = useState(30);
  const [maxDecibels, setMaxDecibels] = useState(30);

  const animate = () => {
    const newPoints = [];

    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
      const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      newPoints.push(point);
    }

    points.current = newPoints;
  };

  const path = useComputedValue(() => {
    animate();
    return spline(points.current, 1, true);
  }, [clock]);

  const colorNoise = useComputedValue(() => {
    hueNoiseOffset.current += noiseStep / 2;
    const hueNoise = noise(hueNoiseOffset.current, hueNoiseOffset.current);
    const newValue = map(hueNoise, -1, 1, 0, 360);

    return vec(256, newValue);
  }, [clock]);

  return (
    <SafeAreaView className="flex justify-center items-center">
      <Text className="text-white text-xl font-extrabold absolute right-30 z-20">
        {currDecibels} dB
      </Text>
      <Text className="text-[#D9DDDC] text-sm absolute left-30 bottom-40 z-20">
        Min:{" "}
        {currDecibels < minDecibels
          ? setMinDecibels(currDecibels)
          : minDecibels}{" "}
        dB | Max:{" "}
        {currDecibels > maxDecibels
          ? setMaxDecibels(currDecibels)
          : maxDecibels}{" "}
        dB
      </Text>
      <Canvas style={styles.canvas}>
        <Path path={path}>
          <LinearGradient
            start={vec(0, 0)}
            end={colorNoise}
            colors={["#4C137E", "#101C43"]}
          />
        </Path>
      </Canvas>
    </SafeAreaView>
  );
};

export default MorphingCircle;

const styles = StyleSheet.create({
  canvas: {
    height: 425,
    width: 425,
  },
});
