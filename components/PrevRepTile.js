import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrevRepTile = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.setsView}>
        <View style={styles.exerciseSetAdjustment}>
          <Text style={styles.editableSetAdjustmentText}>{props.lbs}</Text>
        </View>
        <View style={styles.exerciseSetAdjustment}>
          <Text style={styles.editableSetAdjustmentText}>{props.reps}</Text>
        </View>
        <View style={styles.exerciseSetAdjustment}>
          <Text style={styles.editableSetAdjustmentText}>
            {(props.lbs * props.reps) / 10}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 5,
    width: "100%",
  },
  setAdjustmentText: {
    color: "#fff",
  },
  editableSetAdjustmentText: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
    textAlign: "center",
  },
  exerciseSetAdjustment: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 24,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 50,
    elevation: 3,
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 16,
    width: "32%",
  },
  setsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PrevRepTile;
