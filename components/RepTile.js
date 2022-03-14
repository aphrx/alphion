import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const RepTile = (props) => {
  const [lbsValue, setLbsValue] = useState(props.lbs);
  const [repsValue, setRepsValue] = useState(props.reps);

  const updateValues = (lbs, reps) => {
    if (props.isComplete) {
      props.onUpdate(props.index, lbs, reps, props.isComplete);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.setsView}>
        <View style={styles.exerciseSetAdjustment}>
          <TextInput
            keyboardType={
              Platform.OS === "android" ? "phone-pad" : "number-pad"
            }
            style={styles.editableSetAdjustmentText}
            placeholder="-"
            placeholderTextColor={"#fff"}
            onChangeText={(text) => {
              setLbsValue(text);
              updateValues(text, repsValue);
            }}
          >
            {lbsValue}
          </TextInput>
        </View>
        <View style={styles.exerciseSetAdjustment}>
          <TextInput
            keyboardType={
              Platform.OS === "android" ? "phone-pad" : "number-pad"
            }
            style={styles.editableSetAdjustmentText}
            placeholder="-"
            placeholderTextColor={"#fff"}
            onChangeText={(text) => {
              setRepsValue(text);
              updateValues(lbsValue, text);
            }}
          >
            {repsValue}
          </TextInput>
        </View>
        <TouchableOpacity
          style={props.isComplete ? styles.checkButton : styles.checkButtonNC}
          onPress={() => {
            props.isComplete
              ? props.onUncomplete(props.index)
              : props.onComplete(props.index, lbsValue, repsValue);
          }}
        >
          <Text style={styles.editableSetAdjustmentText}>
            <FontAwesome5 name={"check"} solid />
          </Text>
        </TouchableOpacity>
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
    width: "35%",
  },
  checkButton: {
    backgroundColor: "#0cc98f",
    color: "#fff",
    alignItems: "center",
    borderRadius: 50,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 16,
    width: "18%",
  },
  checkButtonNC: {
    backgroundColor: "#000",
    color: "#fff",
    alignItems: "center",
    borderRadius: 50,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 16,
    width: "18%",
  },
  setsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RepTile;
