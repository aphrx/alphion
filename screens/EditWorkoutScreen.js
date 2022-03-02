import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExerciseTileWithSets from "../components/ExerciseTileWithSets.js";
import {
  insertExercise,
  deleteExercises,
  updateWorkouts,
  deleteTask,
} from "../services/Database.js";
import GreenImage from "../assets/green.png";
import PinkImage from "../assets/pink.png";
import BlueImage from "../assets/blue.png";
import PurpleImage from "../assets/purple.png";
import TileOptionButton from "../components/TileOptionButton.js";
import Toast from "react-native-simple-toast";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const EditWorkoutScreen = ({ route, navigation }) => {
  const { workoutName, workoutExercises, workoutId, tileColour } = route.params;
  const [name, setName] = useState(workoutName);
  const [exerciseList, setExerciseList] = useState(workoutExercises);
  const [selectedColour, setSelectedColour] = useState(tileColour);
  const backgrounds = [PinkImage, GreenImage, BlueImage, PurpleImage];

  const checkIfValid = () => {
    for (let i = 0; i < exerciseList.length; i++) {
      if (
        exerciseList[i].exerciseSets == null ||
        exerciseList[i].exerciseSets == "" ||
        exerciseList[i].exerciseReps == "" ||
        exerciseList[i].exerciseReps == null
      ) {
        Toast.show("Some exercises do not have sets and/or reps.");
        return false;
      }
    }
    if (name.trim() == "") {
      Toast.show("Workout does not have a name.");
      return false;
    }
    return true;
  };

  const onSelectColor = (opt) => {
    setSelectedColour(opt);
  };

  const updateWorkoutMeta = async () => {
    updateWorkouts(name, selectedColour, workoutId);
  };

  const handleUpdateWorkout = async () => {
    Keyboard.dismiss();
    if (checkIfValid()) {
      updateWorkoutMeta();
      deleteExercises(workoutId);
      for (let i = 0; i < exerciseList.length; i++) {
        insertExercise(
          workoutId,
          exerciseList[i].exerciseId,
          exerciseList[i].exerciseName,
          exerciseList[i].exerciseMuscle,
          exerciseList[i].exerciseSets,
          exerciseList[i].exerciseReps
        );
      }
      navigation.goBack();
    }
  };

  const handleAddExercise = () => {
    Keyboard.dismiss();
    navigation.navigate("AddExerciseScreen", {
      onReturn: (item) => {
        let conv_item = {
          exerciseId: item.id,
          exerciseName: item.exercise,
          exerciseMuscle: item.muscle,
          exerciseSets: item.sets,
          exerciseReps: item.reps,
        };
        setExerciseList([...exerciseList, conv_item]);
      },
    });
  };

  const renameWorkout = (txt) => {
    setName(txt);
  };

  const onSetChange = (s, i) => {
    let temp = exerciseList;
    temp[i].exerciseSets = s;
    setExerciseList(temp);
  };

  const onRepChange = (r, i) => {
    let temp = exerciseList;
    temp[i].exerciseReps = r;
    setExerciseList(temp);
  };

  const onDelete = (i) => {
    let temp = exerciseList;
    temp.splice(i, 1);
    setExerciseList([...temp]);
  };

  const toExercise = (exerciseName, exerciseMuscle, exerciseId, workoutId) => {
    navigation.navigate("ExerciseScreen", {
      exerciseName: exerciseName,
      exerciseMuscle: exerciseMuscle,
      exerciseId: exerciseId,
      workoutId: workoutId,
    });
  };

  const handleDeleteWorkout = (workoutId) => {
    deleteTask(workoutId);
    navigation.pop(2);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <View style={styles.cardContainer}>
              <ImageBackground
                source={backgrounds[selectedColour]}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.imageInner}>
                  <TextInput
                    style={styles.imageText}
                    value={name}
                    placeholder={"New Workout"}
                    onChangeText={(text) => renameWorkout(text)}
                    autoFocus={true}
                  />
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      onPress={() => handleDeleteWorkout(workoutId)}
                    >
                      <FontAwesome5
                        name={"trash-alt"}
                        style={styles.trashIcon}
                        solid
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.imageOptions}>
                  <TileOptionButton
                    key={selectedColour}
                    opt={0}
                    selected={selectedColour}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColour + 1}
                    opt={1}
                    selected={selectedColour}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColour + 2}
                    opt={2}
                    selected={selectedColour}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColour + 3}
                    opt={3}
                    selected={selectedColour}
                    onPress={onSelectColor}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.workoutWrapper}></View>
          </View>
        </View>
        <View style={styles.exerciseHeader}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          <TouchableOpacity
            style={styles.addExercise}
            onPress={() => handleAddExercise()}
          >
            <Text style={styles.addExerciseText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exerciseWrapper}>
          {exerciseList.length != 0 ? (
            exerciseList.map(
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
                  <ExerciseTileWithSets
                    key={index}
                    id={index}
                    exercise={exerciseName}
                    muscle={exerciseMuscle}
                    sets={exerciseSets}
                    reps={exerciseReps}
                    onSetChange={onSetChange}
                    onRepChange={onRepChange}
                    toExercise={toExercise}
                    onDelete={onDelete}
                    wid={-1}
                    eid={exerciseId}
                    enabled={true}
                  />
                );
              }
            )
          ) : (
            <Text style={styles.noExercises}>No Exercises</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.add}
        onPress={() => handleUpdateWorkout()}
      >
        <Text style={styles.doneText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  noExercises: {
    color: "#fff",
    fontSize: 18,
    paddingTop: 30,
    textAlign: "center",
  },
  imageBackground: {
    flexDirection: "column",
    height: 150,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  imageText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
    paddingTop: 0,
    paddingLeft: 20,
    width: "80%",
  },
  exerciseHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  exerciseWrapper: {
    paddingHorizontal: 20,
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
    marginTop: 20,
    marginLeft: 25,
  },
  items: {
    marginTop: 30,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#1B1B1B",
    color: "#fff",
    borderRadius: 15,
    width: "100%",
  },
  workoutWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  workoutTileWrapper: {
    width: "47%",
  },
  newWorkoutTile: {
    borderRadius: 20,
  },
  add: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#007AFF",
    alignItems: "center",
    borderRadius: 20,
    elevation: 3,
    margin: 20,
  },
  doneText: {
    color: "#fff",
    fontSize: 20,
  },
  addExercise: {
    backgroundColor: "#1B1B1B",
    color: "#fff",
    padding: 24,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 50,
    elevation: 3,
    marginTop: 15,
    marginRight: 20,
    marginBottom: 0,
  },
  addExerciseText: {
    color: "#fff",
    fontSize: 18,
  },
  imageInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  editButton: {
    margin: 10,
  },
  editIcon: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
    marginRight: 10,
  },
  imageOptions: {
    //backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    height: 50,
    paddingRight: 15,
  },
  colorOptions: {
    padding: 20,
    //backgroundColor: '#000',
    width: 20,
    borderRadius: 20,
    margin: 5,
  },
  trashIcon: {
    color: "#fff",
    fontSize: 20,
    margin: 10,
  },
  buttons: {
    flexDirection: "row",
    margin: 10,
  },
});

export default EditWorkoutScreen;
