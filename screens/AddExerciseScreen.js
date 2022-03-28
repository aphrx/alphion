import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import ExerciseTile from "../components/ExerciseTile";
import { getExerciseOptions, insertExerciseOption } from "../services/Database";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const AddExerciseScreen = ({ route, navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [page, setPage] = useState(1);
  const sheetRef = useRef(null);
  const [customExercise, setCustomExercise] = useState(null);
  const [customMuscle, setCustomMuscle] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(0);

  useEffect(() => {
    load_exercises(1);
  }, []);

  async function load_exercises(page) {
    let exerc = await getExerciseOptions(page, search);
    setExercises([...exercises, ...exerc]);
  }

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 60
    );
  };

  async function handleSearch(txt) {
    setSearch(txt);
    let exerc = await getExerciseOptions(1, txt);
    setExercises([...exerc]);
  }

  const handleAddExercise = (id, exercise, muscle) => {
    Keyboard.dismiss();
    route.params.onReturn({ id, exercise, muscle, sets: null, reps: null });
    navigation.goBack();
  };
  const handleAddCustomExercise = async (exercise, muscle) => {
    let id = await insertExerciseOption(exercise, muscle, 1);
    route.params.onReturn({ id, exercise, muscle, sets: null, reps: null });
    navigation.goBack();
  };

  renderInner = () => (
    <View style={styles.modalContainer}>
      <View style={styles.centerContainer}>
        <Text style={styles.modalHeader}>Custom Exercise</Text>
        <TextInput
          style={styles.modalTextInput}
          placeholder="Name"
          placeholderTextColor={"#fff"}
          onChangeText={(text) => setCustomExercise(text)}
        ></TextInput>
        <TextInput
          style={styles.modalTextInput}
          placeholder="Muscle"
          placeholderTextColor={"#fff"}
          onChangeText={(text) => setCustomMuscle(text)}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={async () =>
          await handleAddCustomExercise(customExercise, customMuscle)
        }
      >
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              load_exercises(page + 1);
              setPage(page + 1);
            }
          }}
        >
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <TouchableOpacity
              onPress={() => {
                isOpen ? setIsOpen(0) : setIsOpen(1);
                sheetRef.current.snapTo(isOpen);
              }}
            >
              <FontAwesome5 name={"edit"} style={styles.customExercise} solid />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder={"Search"}
            placeholderTextColor={"#fff"}
            onChangeText={async (text) => await handleSearch(text)}
          />
          {exercises.map(({ id, exercise, muscle }) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => handleAddExercise(id, exercise, muscle)}
              >
                <ExerciseTile key={id} exercise={exercise} muscle={muscle} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[340, -1000]}
        borderRadius={20}
        renderContent={this.renderInner}
        initialSnap={1}
        enabledInnerScrolling={false}
        onCloseEnd={() => setIsOpen(0)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  customExercise: {
    color: "#fff",
    fontSize: 25,
    marginTop: 5,
    marginRight: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    backgroundColor: "#000",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    marginLeft: 5,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#1B1B1B",
    color: "#fff",
    borderRadius: 15,
    width: "100%",
    marginVertical: 10,
  },
  add: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#0cc98f",
    alignItems: "center",
    borderRadius: 20,
    elevation: 3,
    width: "90%",
    margin: 20,
  },
  doneText: {
    color: "#fff",
    fontSize: 20,
  },
  modalTextInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#1b1b1b",
    color: "#fff",
    borderRadius: 20,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  modalContainer: {
    justifyContent: "center",
    elevation: 2,
    backgroundColor: "#0f0f0f",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  centerContainer: {
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 22,
    color: "#fff",
    paddingVertical: 20,
  },
});

export default AddExerciseScreen;
