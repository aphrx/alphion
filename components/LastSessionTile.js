import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import PrevRepHeader from "./PrevRepHeader";
import PrevRepTile from "./PrevRepTile";
import { getExerciseName, getLastSetsForExercise } from "../services/Database";
import moment from "moment";


const screenWidth = Dimensions.get("window").width;

const LastSessionTile = (props) => {
  const [setsList, setSetsList] = useState([]);
  const [exerciseName, setExerciseName] = useState(null);
  const [sessionDate, setSessionDate] = useState(null);

  useEffect(() => {
    async function getSets() {
      let s = await getLastSetsForExercise(
        props.wid,
        props.eid
      );

      if (!props.title) {
        setExerciseName(await getExerciseName(props.eid));
      }
      if(s.length > 0){
        setSessionDate(s[0].date)
      }
      setSetsList(s);
      if (props.getTenRM) {
        findHighestTenRM(s);
      }
    }
    getSets();
  
  }, []);

  const findHighestTenRM = (s) => {
    let temp = [];
    for (let i = 0; i < s.length; i++) {
      temp.push((s[i].weight * s[i].reps) / 10);
    }
    props.getTenRM(props.index, Math.max(...temp));
  };

  if (setsList.length == 0) {
    return <View></View>;
  }

  return (
    <View style={styles.item}>
      <Text style={styles.exerciseText}>
        {moment(sessionDate).format("MMMM Do YYYY")}
      </Text>
      <View style={styles.repView}>
        <PrevRepHeader />
        {setsList.map(({ setIndex, weight, reps }, index) => {
          return (
            <PrevRepTile
              key={index}
              index={setIndex}
              lbs={weight}
              reps={reps}
            />
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#1B1B1B",
    marginVertical: 10,
    marginHorizontal: 20,
    width: screenWidth - 40,
  },
  exerciseText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 5,
    textTransform: "capitalize",
  },
  repView: {
    marginTop: 10,
    width: "100%",
  },
});

export default LastSessionTile;
