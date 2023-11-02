import { Audio } from "expo-av";
import { AudioRecorder } from "react-native-audio";

export function startTimer(counterRef, setSeconds) {
  counterRef.current = setInterval(() => setSeconds((prev) => prev + 1), 1000);
}

export function stopTimer(counterRef, setSeconds, setMinutes) {
  clearInterval(counterRef.current);
  setSeconds(0);
  setMinutes(0);
}

export function stopWaveformTimer(counterRef, setWaveformTimer) {
  clearInterval(counterRef.current);
  setWaveformTimer(0);
}

export function openPurchaseModal(navigation) {
  navigation.navigate("Paywall");
}

export function resetVisualizer(setVisualizerParams) {
  setVisualizerParams({ speed: 500, frequency: 2, amplitude: 10 });
}

export async function stopDecibelMeter() {
  await AudioRecorder.stopRecording();
}

export async function startDBMetering(setRecording, setCurrDecibels) {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
      (data) => {
        setCurrDecibels((state) => {
          if (data.metering) return Math.round(data.metering) + 80;
          else return state;
        });
      }
    );

    setRecording(recording);
  } catch (err) {
    console.error("Failed to start recording", err);
  }
}

export async function stopDBMetering(recording, setRecording) {
  if (recording) {
    setRecording(undefined);
    recording.stopAndUnloadAsync();
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  }
}
