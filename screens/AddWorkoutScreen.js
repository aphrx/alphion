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
import { insertTask, insertExercise } from "../services/Database.js";
import GreenImage from "../assets/green.png";
import PinkImage from "../assets/pink.png";
import BlueImage from "../assets/blue.png";
import PurpleImage from "../assets/purple.png";
import TileOptionButton from "../components/TileOptionButton.js";
import Toast from "react-native-simple-toast";

const AddWorkoutScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const backgrounds = [PinkImage, GreenImage, BlueImage, PurpleImage];

  const checkIfValid = () => {
    if (exerciseList.length == 0) {
      Toast.show("Workout does not have any exercises.");
      return false;
    }
    for (let i = 0; i < exerciseList.length; i++) {
      if (
        exerciseList[i].sets == null ||
        exerciseList[i].sets == "" ||
        exerciseList[i].reps == "" ||
        exerciseList[i].reps == null
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
    setSelectedColor(opt);
  };

  const handleAddWorkout = async () => {
    Keyboard.dismiss();
    if (checkIfValid()) {
      let wid = await insertTask(name, selectedColor);

      for (let i = 0; i < exerciseList.length; i++) {
        insertExercise(
          wid,
          exerciseList[i].id,
          exerciseList[i].exercise,
          exerciseList[i].muscle,
          exerciseList[i].sets,
          exerciseList[i].reps
        );
      }
      navigation.goBack();
    }
  };
  0;
  const handleAddExercise = () => {
    Keyboard.dismiss();
    navigation.navigate("AddExerciseScreen", {
      onReturn: (item) => setExerciseList([...exerciseList, item]),
    });
  };

  const renameWorkout = (txt) => {
    setName(txt);
  };

  const onSetChange = (s, i) => {
    let temp = exerciseList;
    temp[i].sets = s;
    setExerciseList(temp);
  };

  const onRepChange = (r, i) => {
    let temp = exerciseList;
    temp[i].reps = r;
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <View style={styles.cardContainer}>
              <ImageBackground
                source={backgrounds[selectedColor]}
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
                </View>
                <View style={styles.imageOptions}>
                  
                  <TileOptionButton
                    key={selectedColor + 10}
                    opt={0}
                    selected={selectedColor}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColor + 40}
                    opt={1}
                    selected={selectedColor}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColor + 60}
                    opt={2}
                    selected={selectedColor}
                    onPress={onSelectColor}
                  />
                  <TileOptionButton
                    key={selectedColor + 80}
                    opt={3}
                    selected={selectedColor}
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
            exerciseList.map(({ id, exercise, muscle, sets, reps }, index) => {
              return (
                <ExerciseTileWithSets
                  key={index}
                  id={index}
                  exercise={exercise}
                  muscle={muscle}
                  sets={sets}
                  reps={reps}
                  onSetChange={onSetChange}
                  onRepChange={onRepChange}
                  toExercise={toExercise}
                  onDelete={onDelete}
                  wid={-1}
                  eid={id}
                  enabled={true}
                />
              );
            })
          ) : (
            <Text style={styles.noExercises}>No Exercises</Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.add} onPress={() => handleAddWorkout()}>
        <Text style={styles.doneText}>Done</Text>
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
    paddingTop: 10,
    paddingLeft: 20,
    width: "85%",
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
    paddingTop: 20,
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
    backgroundColor: "#0cc98f",
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
});

export default AddWorkoutScreen;
