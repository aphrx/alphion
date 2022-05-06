import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WorkoutTile from "../components/WorkoutTile";
import CreateWorkoutBtn from "../components/CreateWorkoutBtn";
import { createTable, alterTable, db, getSessions } from "../services/Database";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import ContributionGraphTile from "../components/ContributionGraphTile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as StoreReview from "expo-store-review";

const WorkoutScreen = ({ navigation }) => {
  const [taskItems, setTaskItems] = useState([]);
  const isFocused = useIsFocused();
  const [contributionSessions, setContributionSessions] = useState([]);
  const endDate = moment().day(6);

  useEffect(() => {
    createTable();
    alterTable();
    // inAppReview();
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

  // const inAppReview = async () => {
  //   console.log("hoi");
  //   const install_date = AsyncStorage.getItem("@app_review_date");
  //   if (!install_date ) {
  //     try {
  //       await AsyncStorage.setItem(
  //         "@app_review_date",
  //         moment().day(5).format("YYYY-MM-DD")
  //       );
  //     } catch (e) {}
  //   }
  //   if (moment().diff(moment(install_date, "YYYY-MM-DD")) < 0) {
  //     if (StoreReview.isAvailableAsync()) {
  //       await StoreReview.requestReview()
  //         .then(function (response) {
  //           console.log(StoreReview.storeUrl());
  //           console.log("response is", response);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     }
  //     try {
  //       await AsyncStorage.removeItem("@app_review_date");
  //     } catch (e) {}
  //   }

  // };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.tasksWrapper}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Workouts</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <FontAwesome5
                  name={"user-circle"}
                  style={styles.profileIcon}
                  solid
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllSessionScreen")}
            >
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
                      <WorkoutTile
                        workoutText={task}
                        tileColour={colourOption}
                      />
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    paddingTop: Platform.OS === "android" ? 0 : 40,
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
    marginBottom: 10,
  },
  items: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  workoutWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  workoutTileWrapper: {
    width: "47%",
  },
  profileIcon: {
    color: "#fff",
    fontSize: 35,
  },
});

export default WorkoutScreen;
