import RNSoundLevel from "react-native-sound-level";

const MONITOR_INTERVAL = 250; // in ms

const requestPermission = async () => {
  // request permission to access microphone
  // ...
  if (success) {
    // start monitoring
    RNSoundLevel.start();

    // you may also specify a monitor interval (default is 250ms)
    RNSoundLevel.start(MONITOR_INTERVAL);

    // or add even more options
    RNSoundLevel.start({
      monitorInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    });
  }
};

useEffect(() => {
  RNSoundLevel.onNewFrame = (data) => {
    // see "Returned data" section below
    console.log("Sound level info", data);
  };

  return () => {
    // don't forget to stop it
    RNSoundLevel.stop();
  };
}, []);
