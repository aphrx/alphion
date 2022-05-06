import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import PrevRepHeader from "./PrevRepHeader";
import PrevRepTile from "./PrevRepTile";
import { getExerciseName, getSetsForExercise } from "../services/Database";

const screenWidth = Dimensions.get("window").width;

const PrevSessionTile = (props) => {
  const [setsList, setSetsList] = useState([]);
  const [exerciseName, setExerciseName] = useState(null);

  useEffect(() => {
    if (props.pSession.id != -1 && props.pSession.id != undefined) {
      async function getSets() {
        let s = await getSetsForExercise(
          props.wid,
          props.pSession.id,
          props.eid
        );

        if (!props.title) {
          setExerciseName(await getExerciseName(props.eid));
        }

        setSetsList(s);
        if (props.getTenRM) {
          findHighestTenRM(s);
        }
      }
      getSets();
    }
  }, []);

  const findHighestTenRM = (s) => {
    let temp = [];
    for (let i = 0; i < s.length; i++) {
      temp.push((s[i].weight * s[i].reps) / 10);
    }
    props.getTenRM(props.index, Math.max(...temp));
  };

  if (props.pSession.date == -1 || setsList.length == 0) {
    return <View></View>;
  }

  return (
    <View style={styles.item}>
      <Text style={styles.exerciseText}>
        {props.title ? props.title : exerciseName}
      </Text>
      <View style={styles.repView}>
        <PrevRepHeader />
        {setsList.map(({ setIndex, weight, reps }, index) => {
          return(
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
  },
  repView: {
    marginTop: 10,
    width: "100%",
  },
});

export default PrevSessionTile;
