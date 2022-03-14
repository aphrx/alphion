import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import GreenImage from "../assets/green.png";
import PinkImage from "../assets/pink.png";
import BlueImage from "../assets/blue.png";
import PurpleImage from "../assets/purple.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const WorkoutTileLg = (props) => {
  const backgrounds = [PinkImage, GreenImage, BlueImage, PurpleImage];

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={backgrounds[props.tileColour]}
        style={styles.item}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.imageInner}>
          <Text style={styles.workoutText}>{props.workoutText}</Text>
          <View style={styles.buttons}>
            {props.isEditable ? (
              <TouchableOpacity onPress={() => props.onEdit()}>
                <FontAwesome5
                  name={"pencil-alt"}
                  style={styles.editIcon}
                  solid
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            {props.isDeletable ? (
              <TouchableOpacity onPress={() => props.onDelete(props.wid)}>
                <FontAwesome5
                  name={"trash-alt"}
                  style={styles.trashText}
                  solid
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    height: 150,
    marginBottom: 20,
  },
  workoutText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 22,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  imageInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  editIcon: {
    color: "#fff",
    fontSize: 20,
    margin: 10,
  },
  buttons: {
    flexDirection: "row",
    margin: 10,
  },
  trashText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
    marginRight: 10,
  },
});

export default WorkoutTileLg;
