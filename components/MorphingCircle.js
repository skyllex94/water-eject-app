import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { spline } from "@georgedoescode/spline";

// Decibel Level imports
import { AudioRecorder, AudioUtils } from "react-native-audio";
let audioPath = AudioUtils.DocumentDirectoryPath + "/test.aac";

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
import { useEffect } from "react";
import { Button } from "react-native";
import { useState } from "react";

function createPoints() {
  const points = [];
  // how many points do we need
  const numPoints = 6;
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / numPoints;
  // the radius of the circle
  const rad = 110;

  for (let i = 1; i <= numPoints; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 130 + Math.cos(theta) * rad;
    const y = 130 + Math.sin(theta) * rad;

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

const MorphingCircle = () => {
  // Decibel State UI
  const [currDecibels, setCurrDecibels] = useState(0);

  const clock = useClockValue();
  const points = useValue(createPoints());
  const hueNoiseOffset = useValue(0);
  const noise = createNoise2D();
  const noiseStep = 0.005;

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

  useEffect(() => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      MeteringEnabled: true,
      MeasurementMode: true,
    });
  }, []);

  async function startDecibelMetering() {
    await AudioRecorder.startRecording();
    await AudioRecorder.resumeRecording();

    AudioRecorder.onProgress = (data) => {
      setCurrDecibels(Math.trunc(data.currentMetering + 100));
    };
  }

  async function stopDecibelMetering() {
    await AudioRecorder.stopRecording();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => startDecibelMetering()} title="Start Metering" />

      <Button onPress={() => stopDecibelMetering()} title="Stop" />

      <Text className="text-white absolute right-30 z-20">
        {currDecibels} DB
      </Text>
      <Canvas style={styles.canvas}>
        <Path path={path}>
          <LinearGradient
            start={vec(0, 0)}
            end={colorNoise}
            colors={["#409fad", "#05103A"]}
          />
        </Path>
      </Canvas>
    </SafeAreaView>
  );
};

export default MorphingCircle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    height: 275,
    width: 275,
  },
});
