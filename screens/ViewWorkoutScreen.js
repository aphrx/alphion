import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import WorkoutTileLg from "../components/WorkoutTileLg.js";
import {
  db,
  insertSession,
  getIfLastSessionCompleted,
} from "../services/Database.js";
import BottomSheet from "reanimated-bottom-sheet";
import ExerciseTile from "../components/ExerciseTile.js";
import { useIsFocused } from "@react-navigation/native";
import SessionTile from "../components/SessionTile.js";

const ViewWorkoutScreen = ({ route, navigation }) => {
  const [workoutName, setWorkoutName] = useState();
  const [tileColour, setTileColour] = useState();
  const { workoutId } = route.params;
  const [exercises, setExercises] = useState([]);
  const [sessions, setSessions] = useState([]);
  const isFocused = useIsFocused();
  const [prevSessionId, setPrevSessionId] = useState(-1);
  const sheetRef = useRef(null);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * FROM Exercises WHERE workoutId = ?",
          [workoutId],
          (_, { rows: { _array } }) => setExercises(_array)
        )
      );
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * FROM Sessions WHERE workoutId = ? AND isComplete = 1 order by id desc",
          [workoutId],
          (_, { rows: { _array } }) => setSessions(_array)
        )
      );
      db.transaction((tx) =>
        tx.executeSql(
          "SELECT * FROM Workouts WHERE id = ?",
          [workoutId],
          (_, { rows: { _array } }) => {
            if (_array.length != 0) {
              setWorkoutName(_array[0].task);
              setTileColour(_array[0].colourOption);
            }
          }
        )
      );
    }

    return () => {
      unmounted = true;
    };
  }, [isFocused]);

  const handleStartWorkout = async () => {
    let lastSess = await getIfLastSessionCompleted(workoutId);
    if (lastSess.length == 0) {
      return startWorkout();
    } else if (lastSess[0].isComplete) {
      return startWorkout();
    } else {
      sheetRef.current.snapTo(0);
      setPrevSessionId(lastSess[0].id);
    }
  };

  const startWorkout = async () => {
    console.log("Starting workout")
    let sid = await insertSession(workoutId);

    navigation.navigate("LiveWorkoutScreen", {
      workoutId: workoutId,
      workoutName: workoutName,
      sessionId: sid,
      tileColour: tileColour,
      prevWorkoutSession: false,
    });
    sheetRef.current.snapTo(1);
  };

  const continueWorkout = async () => {
    console.log("Continuing workout")
    navigation.navigate("LiveWorkoutScreen", {
      workoutId: workoutId,
      workoutName: workoutName,
      sessionId: prevSessionId,
      tileColour: tileColour,
      prevWorkoutSession: true,
    });
    sheetRef.current.snapTo(1);
  };

  const toExercise = (exerciseName, exerciseMuscle, exerciseId, workoutId) => {
    navigation.navigate("ExerciseScreen", {
      exerciseName: exerciseName,
      exerciseMuscle: exerciseMuscle,
      exerciseId: exerciseId,
      workoutId: workoutId,
    });
  };

  const toSession = (workoutId, sessionId, date) => {
    navigation.navigate("SessionScreen", {
      workoutId: workoutId,
      sessionId: sessionId,
      date: date,
    });
  };

  const onEdit = () => {
    navigation.navigate("EditWorkoutScreen", {
      workoutName: workoutName,
      workoutExercises: exercises,
      workoutId: workoutId,
      tileColour: tileColour,
    });
  };

  renderInner = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.prevButton}
        onPress={() => continueWorkout()}
      >
        <Text style={styles.startText}>Previous Session</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.start} onPress={() => startWorkout()}>
        <Text style={styles.startText}>Start New Session</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <WorkoutTileLg
              workoutText={workoutName}
              tileColour={tileColour}
              isEditable={true}
              onEdit={onEdit}
              goBack={navigation.goBack}
            />
            <View style={styles.exerciseSection}>
              <Text style={styles.sectionTitle}>Exercises</Text>
              {exercises.length != 0 ? (
                exercises.map(
                  (
                    {
                      exerciseId,
                      exerciseName,
                      exerciseMuscle,
                      exerciseSets,
                      exerciseReps,
                    },
                    index
                  ) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          toExercise(
                            exerciseName,
                            exerciseMuscle,
                            exerciseId,
                            workoutId
                          )
                        }
                      >
                        <ExerciseTile
                          exercise={exerciseName}
                          muscle={exerciseMuscle}
                          sets={exerciseSets}
                          reps={exerciseReps}
                        />
                      </TouchableOpacity>
                    );
                  }
                )
              ) : (
                <Text style={styles.noExercises}>No Exercises</Text>
              )}
            </View>
            <View style={styles.exerciseSection}>
              <Text style={styles.sectionTitle}>Sessions</Text>
              {sessions.length != 0 ? (
                sessions.map(({ id, date }, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toSession(workoutId, id, date)}
                    >
                      <SessionTile date={date} workoutName={workoutName} />
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={styles.noExercises}>No Sessions</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.start}
        onPress={async () => handleStartWorkout()}
      >
        <Text style={styles.startText}>Start Workout</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[180, -1000]}
        borderRadius={20}
        renderContent={renderInner}
        enabledContentTapInteraction={false}
        initialSnap={1}
        enabledInnerScrolling={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 0 : 40,
    flex: 1,
    backgroundColor: "#000",
  },
  noExercises: {
    color: "#fff",
    fontSize: 18,
    paddingTop: 30,
    textAlign: "center",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 10,
  },
  newWorkoutTile: {
    borderRadius: 20,
  },
  exerciseSection: {
    marginBottom: 10,
  },
  start: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#0cc98f",
    borderRadius: 20,
    elevation: 3,
    alignItems: "center",
    margin: 20,
    marginTop: 0,
  },
  prevButton: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#007aff",
    borderRadius: 20,
    elevation: 3,
    alignItems: "center",
    margin: 20,
    marginTop: 0,
  },
  startText: {
    color: "#fff",
    fontSize: 20,
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "#0F0F0F",
    paddingTop: 30,
    paddingBottom: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default ViewWorkoutScreen;
