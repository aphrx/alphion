import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import WorkoutTile from "../components/WorkoutTile";
import CreateWorkoutBtn from "../components/CreateWorkoutBtn";
import { createTable, db, getSessions } from "../services/Database";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import ContributionGraphTile from "../components/ContributionGraphTile";

const WorkoutScreen = ({ navigation }) => {
  const [taskItems, setTaskItems] = useState([]);
  const isFocused = useIsFocused();
  const [contributionSessions, setContributionSessions] = useState([]);
  const endDate = moment().day(6);

  useEffect(() => {
    createTable();
    if (isFocused) {
      db.transaction((tx) =>
        tx.executeSql("SELECT * FROM Workouts", [], (_, { rows: { _array } }) =>
          setTaskItems(_array)
        )
      );
      async function func() {
        let sessions = await getSessions();
        setContributionSessions(sessions);
      }
      func();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Workouts</Text>
          <TouchableOpacity onPress={()=> navigation.navigate("AllSessionScreen")}>
          <ContributionGraphTile
            sessions={contributionSessions}
            endDate={endDate}
          />
          </TouchableOpacity>
          <View style={styles.items}></View>
          <View>
            <View style={styles.workoutWrapper}>
              {taskItems.map(({ id, task, colourOption }) => {
                return (
                  <TouchableOpacity
                    style={styles.workoutTileWrapper}
                    key={id}
                    onPress={() =>
                      navigation.navigate("ViewWorkoutScreen", {
                        workoutId: id,
                        workoutName: task,
                        tileColour: colourOption,
                      })
                    }
                  >
                    <WorkoutTile workoutText={task} tileColour={colourOption} />
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={styles.workoutTileWrapper}
                onPress={() => navigation.navigate("AddWorkoutScreen")}
              >
                <CreateWorkoutBtn />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#c0c0c0",
    borderWidth: 0.5,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 0.5,
  },
  calendarItems: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendedTitle: {
    color: "#4d4d4d",
    marginBottom: 10,
  },
  workoutWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  workoutTileWrapper: {
    width: "47%",
  },
});

export default WorkoutScreen;
