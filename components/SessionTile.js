import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

const SessionTile = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.exerciseText}>
        {moment.utc(props.date).local().format("MMMM Do YYYY")}
      </Text>
      <View style={styles.subText}>
        <Text style={styles.text}>{props.workoutName}</Text>
        <Text style={styles.text}>
          {moment.utc(props.date).local().format("h:mm a")}
        </Text>
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
  exerciseText: {
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  subText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default SessionTile;
