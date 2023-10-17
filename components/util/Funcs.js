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
