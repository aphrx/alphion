import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RepHeader from "./RepHeader";
import RepTile from "./RepTile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getSetsForExercise, insertSet } from "../services/Database";
import Toast from "react-native-simple-toast";

const screenWidth = Dimensions.get("window").width;

const LiveExerciseCard = (props) => {
  const [setsList, setSetsList] = useState([]);
  const [sets, setSets] = useState(props.sets);

  const loadPrevSetStates = async (temp) => {
    let sets = await getSetsForExercise(props.wid, props.sid, props.eid);
    temp[0].lbs = 5
    for (let i = 0; i < sets.length; i++) {
      temp[i].lbs = sets[i].weight;
      temp[i].reps = sets[i].reps;
      temp[i].isComplete = 1
    }
    setSetsList(temp);
  };

  const assignSetList = async () => {
    let temp = [];
    for (let i = 1; i <= sets; i++) {
      temp.push({
        index: i,
        lbs: null,
        reps: props.reps,
        isComplete: 0,
      });
    }
    if(props.prevWorkoutSession){
      await loadPrevSetStates(temp);
    }
    else{
      setSetsList(temp);
    }
    
    
  };

  useEffect(() => {
    async function func() {
      await assignSetList();
    }
    func();
  }, []);


  

  const onComplete = (i, l, r) => {
    let temp = setsList;
    temp[i - 1].lbs = l;
    temp[i - 1].reps = r;
    if (l != null && r != null) {
      temp[i - 1].isComplete = 1;
      setSetsList([...temp]);
      insertSet(props.wid, props.eid, props.sid, i, l, r);
    } else {
      Toast.show("Set does not have weight and/or reps.");
    }
  };

  const removeSet = () => {
    setSetsList(setsList.slice(0, -1));
  };

  const addSet = () => {
    let temp = setsList;
    temp.push({
      index: setsList.length + 1,
      lbs: null,
      reps: props.reps,
      isComplete: 0,
    });
    setSetsList(temp);
  };

  return (
    <View style={styles.item}>
      <View style={styles.headerView}>
        <View style={styles.headerMeta}>
          <Text style={styles.exerciseText}>{props.exercise}</Text>
          <Text style={styles.muscleText}>{props.muscle}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            props.toExercise(props.exercise, props.muscle, props.eid, props.wid)
          }
        >
          <FontAwesome5 name={"info-circle"} style={styles.infoText} solid />
        </TouchableOpacity>
      </View>
      <View style={styles.repView}>
        <Text style={styles.setHeader}>SETS</Text>
        <View style={styles.setWrapper}>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => {
              removeSet();
              setSets(sets - 1);
            }}
          >
            <FontAwesome5 style={styles.setButtonText} name={"minus"} solid />
          </TouchableOpacity>
          <Text style={styles.setNumber}>{sets}</Text>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => {
              addSet();
              setSets(sets + 1);
            }}
          >
            <FontAwesome5 style={styles.setButtonText} name={"plus"} solid />
          </TouchableOpacity>
        </View>
        <RepHeader />
        {setsList.map(({ index, lbs, reps, isComplete }) => {
          return (
            <RepTile
              key={index}
              index={index}
              lbs={lbs}
              reps={reps}
              isComplete={isComplete}
              onComplete={onComplete}
            />
          );
        })}
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
    marginHorizontal: 20,
    width: screenWidth - 40,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  infoText: {
    color: "#fff",
    fontSize: 25,
    marginTop: 15,
    marginRight: 5,
  },
  exerciseText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    textTransform: "capitalize",
  },
  muscleText: {
    color: "#fff",
    textTransform: "capitalize",
    paddingLeft: 5,
  },
  repView: {
    marginTop: 10,
    width: "100%",
  },
  setWrapper: {
    backgroundColor: "#000",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  setNumber: {
    color: "#fff",
    fontSize: 30,
  },
  setButton: {
    color: "#fff",
    fontSize: 30,
  },
  setButtonText: {
    color: "#fff",
    fontSize: 25,
  },
  setHeader: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
  },
  doneButton: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#0cc98f",
    borderRadius: 20,
    elevation: 3,
    alignItems: "center",
    margin: 20,
  },
  doneText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default LiveExerciseCard;
