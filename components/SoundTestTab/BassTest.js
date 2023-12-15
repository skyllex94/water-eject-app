import React, { useContext, useState } from "react";

import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome";
import { resetVisualizer, stopDBMetering } from "../Utils/Funcs";
import SoundTestWave from "./SoundTestWave";
import { Context } from "../../contexts/Context";
import useRevenueCat from "../../hooks/useRevenueCat";
import { FontAwesome5 } from "@expo/vector-icons";
import Waveform from "../ClearanceTab/Waveform";

export default function BassTest({ navigation }) {
  const { isProMember } = useRevenueCat();
  const {
    sound,
    setSound,
    currSound,
    setCurrSound,
    setVisualizerParams,
    recording,
    setRecording,
  } = useContext(Context);

  const [songs, setSongs] = useState([
    {
      name: "Bass Instrumental - Used To",
      objName: "isEnabledUsedTo",
      file: require("../../assets/soundtests/used-to.mp3"),
      totalTime: 39,
      loading: false,
      progress: 0,
      waveform: [
        13, 21, 23, 27, 23, 27, 23, 30, 32, 27, 30, 22, 23, 20, 29, 27, 30, 31,
        22, 26, 29, 17, 27, 26, 30, 30, 26, 24, 29, 28, 19, 28, 26,
      ],
      height: 65,
    },
    {
      name: "Bass Instrumental - 151 Rum",
      objName: "isEnabled151Rum",
      file: require("../../assets/soundtests/151-rum.mp3"),
      totalTime: 46,
      loading: false,
      progress: 0,
      waveform: [
        32, 27, 30, 22, 23, 20, 27, 27, 26, 24, 27, 26, 30, 31, 22, 31, 25, 22,
        28, 26, 32, 27, 23, 27, 20, 30, 27, 22, 24, 27, 23, 27, 23,
      ],
    },
  ]);

  const [currTime, setCurrTime] = useState(0);

  async function enableSoundTest(curr, idx) {
    setSongs((songs) =>
      songs.map((song, songIdx) => {
        if (songIdx === idx) return { ...song, loading: true };
        return song;
      })
    );

    setCurrTime(0);
    setSound((state) => ({
      ...!state,
      [curr.objName]: !sound[curr.objName],
    }));
    stopDBMetering(recording, setRecording);
    playSong();

    async function playSong() {
      if (!sound[curr.objName]) {
        if (currSound) currSound.unloadAsync() || undefined;
        const { sound } = await Audio.Sound.createAsync(
          curr.file,
          { progressUpdateIntervalMillis: 1000 },
          (status) => {
            if (!isNaN(status.durationMillis)) {
              setSongs((songs) =>
                songs.map((song, songIdx) => {
                  if (songIdx === idx)
                    return {
                      ...song,
                      progress: Math.floor(
                        (status.positionMillis / status.durationMillis) * 100
                      ),
                    };
                  return song;
                })
              );
              setCurrTime(Math.floor(status.positionMillis / 1000));
            }

            if (status.didJustFinish) unloadSound(sound, curr);
          }
        );

        setCurrSound(sound);
        resetVisualizer(setVisualizerParams);
        sound.playAsync();
      } else unloadSound(currSound, curr);

      setSongs((songs) =>
        songs.map((song, songIdx) => {
          if (songIdx === idx) return { ...song, loading: false };
          return song;
        })
      );
    }
  }

  async function unloadSound(sound, curr) {
    setSound((state) => ({ ...!state, [curr.objName]: false }));
    setCurrTime(0);
    sound.unloadAsync() || undefined;
  }

  return (
    <View className="bg-[#101C43] justify-center rounded-xl mx-3 my-2 pb-3">
      <View className="flex-row items-center m-5">
        {!isProMember && (
          <View className="mr-2">
            <FontAwesome5 name="lock" size={16} color="white" />
          </View>
        )}

        <Text className="text-white">Bass Accuracy</Text>
      </View>

      {songs.map((curr, idx) => (
        <TouchableOpacity key={idx} className="bass-tests items-center my-1.5">
          <TouchableOpacity
            className={`w-[95%] rounded-xl ${
              sound[curr.objName] && "bg-[#4AD0EE]"
            }`}
            onPress={
              isProMember
                ? () => enableSoundTest(curr, idx)
                : () => navigation.navigate("Paywall")
            }
          >
            <View
              className={`justify-between py-2 rounded-xl mt-1 border-white ${
                sound[curr.objName] ? "bg-[#87E5FA]" : "bg-[#05103A]"
              }`}
            >
              <View className="flex-row items-center h-14">
                <View
                  className={`${
                    sound[curr.objName] ? "bg-[#87e5fa]" : "bg-[#101C43]"
                  } items-center justify-center w-12 h-12 mx-3 rounded-xl`}
                >
                  {curr.loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Icon
                      name={sound[curr.objName] ? "stop" : "play"}
                      size={30}
                      color="white"
                    />
                  )}
                </View>
                <View className="w-[75%]">
                  <Waveform
                    waveform={curr.waveform}
                    progress={sound[curr.objName] ? curr.progress : 0}
                  />
                </View>
              </View>

              <View className="flex-row justify-between">
                <Text className="pt-2 ml-3 font-bold text-white">
                  {curr.name}
                </Text>
                <Text className="pt-2 mr-3 font-bold text-white">
                  {sound[curr.objName] ? Math.floor(currTime / 60) : "0"}:
                  {sound[curr.objName] ? currTime % 60 < 10 && "0" : 0}
                  {sound[curr.objName] ? currTime % 60 : 0} /{" "}
                  {Math.floor(curr.totalTime / 60)}:
                  {curr.totalTime % 60 < 10 && "0"}
                  {curr.totalTime % 60}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
}
