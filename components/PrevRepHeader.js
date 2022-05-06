import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrevRepHeader = () => {
  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@metric_weight", (err, value) => {
      if (err) {
        console.log(err);
      } else {
        setIsMetric(JSON.parse(value)); // boolean false
      }
    });
  }, []);

  return (
    <View style={styles.item}>
      <View style={styles.setsView}>
        <Text style={styles.editableSetAdjustmentText}>
          {isMetric ? "KGS" : "LBS"}
        </Text>
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
  setsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PrevRepHeader;
