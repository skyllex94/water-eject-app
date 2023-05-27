export function startTimer(counterRef, setSeconds) {
  counterRef.current = setInterval(() => setSeconds((prev) => prev + 1), 1000);
}

export function stopTimer(counterRef, setSeconds, setMinutes) {
  clearInterval(counterRef.current);
  setSeconds(0);
  setMinutes(0);
}
