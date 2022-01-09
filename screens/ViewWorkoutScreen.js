import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WorkoutTileLg from '../components/WorkoutTileLg.js';
import { deleteTask, db, insertSession } from '../services/Database.js';
import ExerciseTileWithSets from '../components/ExerciseTileWithSets.js';
import ExerciseTile from '../components/ExerciseTile.js';
import { useIsFocused } from "@react-navigation/native";

const ViewWorkoutScreen = ({ route, navigation }) => {

    const [ workoutName, setWorkoutName] = useState();
    const [ tileColour, setTileColour] = useState();
    const { workoutId } = route.params;
    const [exercises, setExercises] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      db.transaction((tx) => tx.executeSql("SELECT * FROM Exercises WHERE workoutId = ?", [workoutId], (_, { rows: { _array } }) => setExercises(_array)));
      db.transaction((tx) => tx.executeSql("SELECT * FROM Workouts WHERE id = ?", [workoutId], (_, { rows: { _array } }) => {
        if(_array.length != 0){
          setWorkoutName(_array[0].task);
          setTileColour(_array[0].colourOption);
        }
      }));
    }, [isFocused])

    const handleDeleteWorkout = (workoutId) => {
      deleteTask(workoutId);
      navigation.goBack();
    }

    const startWorkout = async () => {
      let sid = await insertSession(workoutId)
      navigation.navigate('LiveWorkoutScreen', {workoutId: workoutId, workoutName: workoutName, sessionId: sid, tileColour: tileColour})
    }

    const toExercise = (exerciseName, exerciseMuscle, exerciseId, workoutId) => {
      navigation.navigate("ExerciseScreen", {exerciseName: exerciseName, exerciseMuscle: exerciseMuscle, exerciseId: exerciseId, workoutId: workoutId})
    }

    const onEdit = () => {
      navigation.navigate("EditWorkoutScreen", {workoutName: workoutName, workoutExercises: exercises, workoutId: workoutId, tileColour: tileColour})
    }

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <WorkoutTileLg workoutText={workoutName} tileColour={tileColour} isEditable={true} onEdit={onEdit}/>
            <View style={styles.workoutWrapper}>
            </View>
            <Text style={styles.sectionTitle}>Exercises</Text>
            {
              exercises.length != 0 ? (
                exercises.map(({exerciseId, exerciseName, exerciseMuscle, exerciseSets, exerciseReps}, index) => {
                    // return <ExerciseTileWithSets key={index} exercise={exerciseName} muscle={exerciseMuscle} sets={exerciseSets} reps={exerciseReps} toExercise={toExercise} eid={exerciseId} enabled={false} wid={workoutId} onDelete={handleDeleteWorkout}/>
                    return <TouchableOpacity key={index} onPress={() => toExercise(exerciseName, exerciseMuscle, exerciseId, workoutId)}>
                    <ExerciseTile key={index} exercise={exerciseName} muscle={exerciseMuscle} sets={exerciseSets} reps={exerciseReps}/>
                    </TouchableOpacity>
                })): <Text style={styles.noExercises}>No Exercises</Text>
            }
          </View>
        </View>
        
        </ScrollView>
        {/* <TouchableOpacity
            style={styles.delete}
            onPress={() => handleDeleteWorkout(workoutId)}
        >
            <Text style={styles.doneText}>Delete Workout</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
            style={styles.start}
            onPress={() => startWorkout()}
        >
            <Text style={styles.startText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    noExercises:{
      color: '#fff',
      fontSize: 18,
      paddingTop: 30,
      textAlign: 'center'
    },
    tasksWrapper: {
      paddingTop: 60,
      paddingHorizontal: 20
    },
    sectionTitle: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: 10,
      //marginLeft: 25
    },
    items: {
      marginTop: 30
    },
    writeTaskWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20
    },
    workoutWrapper:{
      flexDirection: "row",
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    workoutTileWrapper:{
      width: '47%',
    },
    newWorkoutTile:{
        borderRadius: 20
    },
    delete: {
        color: '#fff',
        padding: 50,
        paddingVertical: 14,
        backgroundColor: '#000',
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20
    },
    doneText: {
        color: '#ff6666',
        fontSize: 20
    },
    start: {
      color: '#fff',
      padding: 50,
      paddingVertical: 14,
      backgroundColor: '#0cc98f',
      borderRadius: 20,
      elevation: 3,
      alignItems: 'center',
      margin: 20,
    },
    startText: {
        color: '#fff',
        fontSize: 20
    }
  });

export default ViewWorkoutScreen;