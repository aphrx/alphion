import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ExerciseTileWithSets = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.headerView}>
        <View style={styles.headerMeta}>
          <Text style={styles.exerciseText}>{props.exercise}</Text>
          <Text style={styles.muscleText}>{props.muscle}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              props.toExercise(
                props.exercise,
                props.muscle,
                props.eid,
                props.wid
              )
            }
          >
            <FontAwesome5 name={"info-circle"} style={styles.infoText} solid />
          </TouchableOpacity>
          {props.onDelete ? (
            <TouchableOpacity onPress={() => props.onDelete(props.id)}>
              <FontAwesome5 name={"trash-alt"} style={styles.trashText} solid />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>SETS</Text>
        <Text style={styles.headerText}>REPS</Text>
      </View>
      <View style={styles.setsView}>
        <View style={styles.exerciseSetAdjustment}>
          <TextInput
            keyboardType={
              Platform.OS === "android" ? "phone-pad" : "number-pad"
            }
            style={styles.editableSetAdjustmentText}
            placeholder="-"
            placeholderTextColor={"#fff"}
            onChangeText={(text) => props.onSetChange(text, props.id)}
            editable={props.enabled}
          >
            {props.sets}
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
            onChangeText={(text) => props.onRepChange(text, props.id)}
            editable={props.enabled}
          >
            {props.reps}
          </TextInput>
        </View>
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
  infoText: {
    color: "#fff",
    fontSize: 22,
  },
  trashText: {
    color: "#ff6666",
    fontSize: 22,
    paddingLeft: 15,
  },
  exerciseText: {
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  muscleText: {
    color: "#fff",
    textTransform: "capitalize",
  },
  setAdjustmentText: {
    marginTop: 0,
    color: "#fff",
  },
  editableSetAdjustmentText: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
  },
  exerciseSetAdjustment: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 24,
    paddingVertical: 14,
    width: "45%",
    alignItems: "center",
    borderRadius: 50,
    elevation: 3,

    marginRight: 0,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  setsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
  },
  headerText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    width: "45%",
    marginTop: 15,
  },
});

export default ExerciseTileWithSets;
