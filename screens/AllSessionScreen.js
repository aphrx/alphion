import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { db, getAllSessions } from "../services/Database.js";
import { useIsFocused } from "@react-navigation/native";
import SessionTile from "../components/SessionTile.js";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const AllSessionScreen = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function func() {
      let sid = await getAllSessions();
      setSessions(sid);
    }
    func();
  }, []);

  const toSession = (workoutId, sessionId, date) => {
    navigation.navigate("SessionScreen", {
      workoutId: workoutId,
      sessionId: sessionId,
      date: date,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <View style={styles.exerciseSection}>
              <Text style={styles.sectionTitle}>Sessions</Text>
              {sessions.length != 0 ? (
                sessions.map(({ id, date, workoutId, task }, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toSession(workoutId, id, date)}
                    >
                      <SessionTile date={date} workoutName={task} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    //marginLeft: 25
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
  delete: {
    color: "#fff",
    padding: 50,
    paddingVertical: 14,
    backgroundColor: "#000",
    borderRadius: 20,
    elevation: 3,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  doneText: {
    color: "#ff6666",
    fontSize: 20,
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
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "#353535",
    paddingTop: 30,
    paddingBottom: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalHeader: {
    fontSize: 22,
    color: "#fff",
    paddingVertical: 20,
  },
});

export default AllSessionScreen;
