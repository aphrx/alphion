import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrevRepHeader = () => {
  return (
    <View style={styles.item}>
      <View style={styles.setsView}>
        <Text style={styles.editableSetAdjustmentText}>LBS</Text>
        <Text style={styles.editableSetAdjustmentText}>REPS</Text>
        <Text style={styles.editableSetAdjustmentText}>10RM</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },

  editableSetAdjustmentText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    width: "33%",
  },
  editableCheck: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    padding: 15,
    width: "18%",
  },
  setsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PrevRepHeader;
