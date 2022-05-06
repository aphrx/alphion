import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Picker,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import ExerciseTile from "../components/ExerciseTile";
import { getExerciseOptions, insertExerciseOption } from "../services/Database";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Toast from 'react-native-root-toast';

const AddExerciseScreen = ({ route, navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [page, setPage] = useState(1);
  const sheetRef = useRef(null);
  const [customExercise, setCustomExercise] = useState(null);
  const [customMuscle, setCustomMuscle] = useState('Select a muscle');
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(0);
  const [selectedValue, setSelectedValue] = useState();

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
    console.log("adding");
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
        {/* <TextInput
          style=
          placeholder="Muscle"
          placeholderTextColor={"#fff"}

        ></TextInput> */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={customMuscle}
            style={styles.pickerStyle}
            itemStyle={styles.pickerItems}
            onValueChange={(itemValue, _) =>
              setCustomMuscle(itemValue)
            }
          >
            {['Select a muscle', 'Abs', 'Arms', 'Back', 'Calves', 'Chest', 'Legs', 'Shoulders'].map((value) => {
              return <Picker.Item label={value} value={value} />;
            })}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={async () => {
            if(customMuscle != 'Select a muscle' && customExercise != null && customExercise.trim() != ''){
              await handleAddCustomExercise(customExercise.trim(), customMuscle)
            }
            else{
              Toast.show("Make sure that exercise is named and an appropriate muscle group is selected.");
            }
          }
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
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              load_exercises(page + 1);
              setPage(page + 1);
            }
          }}
        >
          <View style={styles.headerRow}>
            <View style={styles.titleHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome5
                  name={"angle-left"}
                  style={styles.backIcon}
                  solid
                />
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Exercises</Text>
            </View>

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
        snapPoints={[650, -1000]}
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
    paddingTop: Platform.OS === "android" ? 20 : 60,
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
    justifyContent: "flex-start",
    elevation: 2,
    backgroundColor: "#0f0f0f",
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 1000,
  },
  centerContainer: {
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 22,
    color: "#fff",
    paddingVertical: 20,
  },
  backIcon: {
    color: "#fff",
    fontSize: 30,
    paddingTop: 4,
    paddingRight: 10,
  },
  titleHeader: {
    flexDirection: "row",
    margin: 5,
  },
  pickerItems: {
    color: "#fff",
  },
  pickerContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#1b1b1b",
    color: "#fff",
    borderRadius: 20,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  pickerStyle: {
    color: "#fff",
  },
});

export default AddExerciseScreen;
