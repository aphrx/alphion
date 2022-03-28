import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getSessionSets, deleteSession } from "../services/Database.js";
import PrevSessionTile from "../components/PrevSessionTile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

const SessionScreen = ({ route, navigation }) => {
  const { workoutId, sessionId, date } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function func() {
      let sid = await getSessionSets(sessionId);
      setExercises(sid);
    }
    func();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.headerView}>
            <View style={styles.headerMeta}>
              <Text style={styles.sectionTitle}>
                {moment.utc(date).local().format("MMMM Do YYYY")}
              </Text>
              <Text style={styles.subTitle}>
                {moment.utc(date).local().format("h:mm a")}
              </Text>
            </View>
          
          <TouchableOpacity
            onPress={() => {
              deleteSession(sessionId);
              navigation.goBack();
            }
            }
          >
            <FontAwesome5 name={"trash-alt"} style={styles.trashText} solid />
          </TouchableOpacity>
          </View>
        </View>
        {exercises.map((obj, index) => {
          return (
            <PrevSessionTile
              key={index}
              index={index}
              pSession={{ id: sessionId, date: date }}
              wid={workoutId}
              eid={obj.exerciseId}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  trashText: {
    color: "#ff6666",
    fontSize: 25,
    marginRight: 5,
  },
});

export default SessionScreen;
