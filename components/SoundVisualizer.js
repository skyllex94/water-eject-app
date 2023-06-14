import React, { useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  StyleSheet,
  Text as RNText,
} from "react-native";

import {
  Skia,
  Canvas,
  Path,
  vec,
  useComputedValue,
  useClockValue,
  useValue,
  useTouchHandler,
  LinearGradient,
} from "@shopify/react-native-skia";

import { line, curveBasis } from "d3";
import { Context } from "./Context";

const dimens = Dimensions.get("screen");
const width = 412; // width of the animation
const initialAmplitude = 12;
const verticalShiftConst = 50;
const height = 100; // can stay as such
const horizontalShift = (dimens.width - width) / 2;
const indicatorArray = Array.from({ length: 16 }, (_, i) => i);

export const SoundVisualizer = ({ speed = 1000, frequency = 2 }) => {
  const verticalShift = useValue(verticalShiftConst);
  const amplitude = useValue(initialAmplitude);
  const clock = useClockValue();

  const touchHandler = useTouchHandler({
    onActive: ({ y }) => {
      if (y > verticalShiftConst) {
        verticalShift.current = Math.min(height, y);
        amplitude.current = Math.max(
          0,
          (height - verticalShift.current) * 0.025
        );
      }
    },
  });

  const createWavePath = (phase = 50) => {
    let points = Array.from({ length: width + horizontalShift }, (_, index) => {
      const angle =
        ((index - horizontalShift) / width) * (Math.PI * frequency) + phase;
      return [
        index,
        amplitude.current * Math.sin(angle) + verticalShift.current,
      ];
    });

    const shiftedPoints = points.slice(horizontalShift, 1000); // curve start
    const lineGenerator = line().curve(curveBasis);
    const waveLine = lineGenerator(shiftedPoints);
    const bottomLine = `L${
      width + horizontalShift
    },${height} L${horizontalShift},${height}`;
    const extendedWavePath = `${waveLine} ${bottomLine} Z`;
    return extendedWavePath;
  };

  const animatedPath = useComputedValue(() => {
    const current = (clock.current / speed) % 225; // speed variable
    const start = Skia.Path.MakeFromSVGString(createWavePath(current));
    const end = Skia.Path.MakeFromSVGString(createWavePath(Math.PI * current));
    return start.interpolate(end, 0.5);
  }, [clock, verticalShift]);

  const gradientStart = useComputedValue(() => {
    return vec(0, verticalShift.current);
  }, [verticalShift]);

  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalShift.current + 250);
  }, [verticalShift]);

  const getLabelYValueOffset = (position) => {
    return verticalShiftConst + 50 * position;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        <Path path={animatedPath} style="fill">
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={["rgba(255, 255, 255, 0.9)", "white"]}
          />
        </Path>
      </Canvas>
    </SafeAreaView>
  );
};

export default SoundVisualizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  canvas: {
    flex: 1,
    borderRadius: 10,
  },
});
