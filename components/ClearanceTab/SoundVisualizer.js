import { Dimensions, StyleSheet, View } from "react-native";

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
import { useContext } from "react";
import { Context } from "../../contexts/Context";

const dimens = Dimensions.get("screen");
const width = dimens.width; // width of the animation
const verticalShiftConst = 50; // height of the wave
const height = 100; // can stay as such
const horizontalShift = (dimens.width - width) / 2;

export const SoundVisualizer = () => {
  const { visualizerParams } = useContext(Context);
  const { speed, frequency, amplitude } = visualizerParams;

  const verticalShift = useValue(verticalShiftConst);
  const clock = useClockValue();
  const amplitudeRef = useValue(amplitude);

  const touchHandler = useTouchHandler({
    onActive: ({ y }) => {
      if (y > verticalShiftConst) {
        verticalShift.current = Math.min(height, y);
        amplitudeRef.current = Math.max(
          0,
          (height - verticalShift.current) * 0.4
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
        amplitudeRef.current * Math.sin(angle) + verticalShift.current,
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
  }, [clock, verticalShift, speed, frequency, amplitude]);

  const gradientStart = useComputedValue(() => {
    return vec(0, verticalShift.current);
  }, [verticalShift]);

  const gradientEnd = useComputedValue(() => {
    return vec(0, verticalShift.current + 250);
  }, [verticalShift]);

  return (
    <View className="my-4 mx-3 h-[120]">
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        <Path path={animatedPath} style="fill">
          <LinearGradient
            start={gradientStart}
            end={gradientEnd}
            colors={["#F5F5F5", "white"]}
          />
        </Path>
      </Canvas>
      <View style={styles.bottomBorder} />
    </View>
  );
};

export default SoundVisualizer;

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  bottomBorder: {
    backgroundColor: "#F5F5F5",
    height: 20,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
