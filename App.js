import { useState } from "react";

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);

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
    <View styles={styles.main}>
      <View style={styles.goalInput}>
        <TextInput
          style={styles.goalText}
          onChangeText={handleGoalInput}
          placeholder="Your Goal"
        />
        <Button
          style={styles.goalButton}
          onPress={addGoalHandler}
          title="Add Goal"
        />
      </View>
      <View style={styles.goalList}>
        <FlatList
          data={goals}
          renderItem={(goalData) => (
            <View style={styles.goalItem}>
              <Text>{goalData.item.text} </Text>
              <Button
                title="X"
                onPress={() => handleDeleteGoal(goalData.index)}
                style={styles.deleteGoal}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
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
