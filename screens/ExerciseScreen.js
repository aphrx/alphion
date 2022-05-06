import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getPrevSession, getPrevSessionSets } from "../services/Database.js";
import PrevSessionTile from "../components/PrevSessionTile";
import ExerciseGraph from "../components/ExerciseGraph.js";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const ExerciseScreen = ({ route, navigation }) => {
  const { exerciseName, exerciseMuscle, exerciseId, workoutId } = route.params;
  const [prevSessionSets, setPrevSessionSets] = useState([]);
  const [prevSessions, setPrevSessions] = useState([]);
  const [sessionsTenRM, setSessionsTenRM] = useState([0]);

  useEffect(() => {
    let unmounted = false;
    async function func() {
      let sid = await getPrevSessionSets(workoutId, exerciseId, true);
      let sessions = await getPrevSession(workoutId, exerciseId);
      setPrevSessions(sessions);
      setPrevSessionSets(sid);
    }
    if (!unmounted) {
      func();
    }
    return () => {
      unmounted = true;
    };
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
          <View style={styles.titleHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome5
                    name={"angle-left"}
                    style={styles.backIcon}
                    solid
                  />
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>{exerciseName}</Text>

              </View>
            <Text style={styles.subTitle}>{exerciseMuscle}</Text>
          </View>
        </View>
        <ExerciseGraph
          prevSessions={prevSessionSets}
          data={sessionsTenRM}
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
    paddingTop: Platform.OS === "android" ? 0 : 40,
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
    marginLeft: 30,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  backIcon: {
    color: "#fff",
    fontSize: 30,
    paddingTop: 0,
    paddingRight: 10,
  },
  titleHeader: {
    flexDirection: "row",
    margin: 5,
  },
});

export default ExerciseScreen;
