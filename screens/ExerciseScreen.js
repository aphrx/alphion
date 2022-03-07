import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getPrevSession } from "../services/Database.js";
import PrevSessionTile from "../components/PrevSessionTile";
import ExerciseGraph from "../components/ExerciseGraph.js";
import moment from "moment";

const ExerciseScreen = ({ route }) => {
  const { exerciseName, exerciseMuscle, exerciseId, workoutId } = route.params;
  const [prevSessions, setPrevSessions] = useState([]);
  const [sessionsTenRM, setSessionsTenRM] = useState([0]);

  useEffect(() => {
    let unmounted = false;
    async function func() {
      let sid = await getPrevSession(workoutId, exerciseId, true);
      setPrevSessions(sid);
    }
    if(!unmounted){
      func();
    }
    return () => {unmounted = true}
  }, []);

  const getSessionTenRM = async (index, tenrm) => {
    if (tenrm != undefined && tenrm != -Infinity) {
      let tr = sessionsTenRM.splice(index, 0, tenrm);

      setSessionsTenRM([...sessionsTenRM, tr]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <Text style={styles.sectionTitle}>{exerciseName}</Text>
            <Text style={styles.subTitle}>{exerciseMuscle}</Text>
          </View>
        </View>
        <ExerciseGraph
          prevSessions={prevSessions}
          data={sessionsTenRM.reverse().slice(-9)}
        />
        {prevSessions.map((obj, index) => {
          return (
            <PrevSessionTile
              key={index}
              index={index}
              pSession={obj}
              title={moment(obj.date).format("MMMM Do YYYY")}
              wid={workoutId}
              eid={exerciseId}
              getTenRM={getSessionTenRM}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 0,
    textTransform: "capitalize",
  },
  subTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "100",
    marginTop: 0,
    marginBottom: 10,
    textTransform: "capitalize",
    //marginLeft: 25
  }
});

export default ExerciseScreen;
