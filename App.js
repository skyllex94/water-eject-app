import { useState } from "react";

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import Frequencies from "./components/Frequencies";
import FreqStartStop from "./components/FreqStartStop";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);
  let ScreenHeight = Dimensions.get("window").height;

  function handleGoalInput(enteredText) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    setGoals((currGoalList) => [
      ...currGoalList,
      { text: enteredGoal, key: Math.random().toString() },
    ]);
  }

  function handleDeleteGoal(idx) {
    console.log(idx);
    setGoals((goals) => goals.filter((_, index) => index !== idx));
  }

  return (
    <View style={styles.main}>
      <Frequencies />
      <FreqStartStop />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#063970",
  },
  text: {
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  goalInput: {
    marginTop: 125,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  goalButton: {
    marginRight: 8,
  },
  goalText: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    borderColor: "#cccccc",
    width: "80%",
  },
  goalList: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  goalItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    margin: 3,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#cccccc",
  },
  deleteGoal: {
    padding: 5,
  },
});
