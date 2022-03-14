import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExerciseTile = (props) => {
  return (
    <View style={props.isCustom ? styles.itemInverse : styles.item}>
      <Text style={styles.customText}>
        {props.isCustom ? "Add Custom Exercise" : props.exercise}
      </Text>
      <View style={styles.subText}>
        <Text style={styles.muscleText}>{props.muscle}</Text>
        {props.sets ? (
          <Text style={styles.repText}>
            {props.sets} x {props.reps} reps
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#1B1B1B",
    marginVertical: 10,
  },
  itemInverse: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#353535",
    marginVertical: 10,
  },
  customText: {
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  muscleText: {
    color: "#fff",
    textTransform: "capitalize",
  },
  repText: {
    color: "#fff",
  },
  subText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  }
});

export default ExerciseTile;
