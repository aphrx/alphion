import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CreateWorkoutBtn = () => {
  return (
    <View style={styles.item}>
      <Text style={styles.workoutText}>+</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#1B1B1B",
    width: "100%",
  },
  workoutText: {
    fontWeight: "100",
    color: "#fff",
    fontSize: 50,
  },
});

export default CreateWorkoutBtn;
