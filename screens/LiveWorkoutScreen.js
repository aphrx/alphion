import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import WorkoutTileLg from "../components/WorkoutTileLg.js";
import LiveExerciseCard from "../components/LiveExerciseCard.js";
import {
  completeSession,
  db,
  getPrevSession,
  getPrevSessionSets,
} from "../services/Database.js";
import { ScrollView } from "react-native-gesture-handler";
import PrevSessionTile from "../components/PrevSessionTile";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import moment from "moment";

const LiveWorkoutScreen = ({ route, navigation }) => {
  const { workoutId, workoutName, sessionId, tileColour, prevWorkoutSession } =
    route.params;
  const [exercises, setExercises] = useState([]);
  const [prevSession, setPrevSession] = useState(-1);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM Exercises WHERE workoutId = ?",
        [workoutId],
        (_, { rows: { _array } }) => setExercises(_array)
      )
    );
    async function func() {
      let pSess = await getPrevSessionSets(workoutId, false);
      setPrevSession(pSess);
    }
    func();
  }, []);

  const toExercise = (exerciseName, exerciseMuscle, exerciseId, workoutId) => {
    navigation.navigate("ExerciseScreen", {
      exerciseName: exerciseName,
      exerciseMuscle: exerciseMuscle,
      exerciseId: exerciseId,
      workoutId: workoutId,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <WorkoutTileLg workoutText={workoutName} tileColour={tileColour} />
        </View>

        <View style={styles.exerciseWrapper}>
          <ExpandingDot
            data={exercises}
            expandingDotWidth={30}
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotStyle={{
              width: 10,
              height: 10,
              backgroundColor: "#fff",
              borderRadius: 5,
              marginHorizontal: 5,
            }}
            activeDotColor="#fff"
            inActiveDotColor="#6b6b6b"
            containerStyle={{
              top: 0,
            }}
            style={styles.dots}
          />
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            style={styles.scrollView}
          >
            {exercises.map(
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
                  <View key={index}>
                    <LiveExerciseCard
                      exercise={exerciseName}
                      muscle={exerciseMuscle}
                      sets={exerciseSets}
                      reps={exerciseReps}
                      wid={workoutId}
                      eid={exerciseId}
                      sid={sessionId}
                      prevWorkoutSession={prevWorkoutSession}
                      toExercise={toExercise}
                    />
                    <PrevSessionTile
                      key={prevSession}
                      pSession={prevSession}
                      title={moment(prevSession.date).format("MMMM Do YYYY")}
                      wid={workoutId}
                      eid={exerciseId}
                    />
                  </View>
                );
              }
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.start}
          onPress={() => {
            completeSession(sessionId);
            navigation.goBack();
          }}
        >
          <Text style={styles.startText}>Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
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
  },
  startText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default LiveWorkoutScreen;
