import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TileOptionButton = (props) => {
  const [isSelected, setIsSelected] = useState(0);

  useEffect(() => {
    let isSel = 0;
    if (props.opt == props.selected) {
      isSel = 1;
    }
    setIsSelected(isSel);
  }, []);

  return (
    <TouchableOpacity
      style={colors[props.opt][isSelected]}
      onPress={() => props.onPress(props.opt)}
    ></TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  pinkOption: {
    padding: 15,
    backgroundColor: "#e795ad",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: "#bbb",
  },
  pinkOptionSelected: {
    padding: 15,
    backgroundColor: "#e795ad",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  greenOption: {
    padding: 15,
    backgroundColor: "#b1cda8",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#bbb",
    borderWidth: 2,
  },
  greenOptionSelected: {
    padding: 15,
    backgroundColor: "#b1cda8",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#fff",
    borderWidth: 2,
  },
  blueOption: {
    padding: 15,
    backgroundColor: "#95c1dc",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#bbb",
    borderWidth: 2,
  },
  blueOptionSelected: {
    padding: 15,
    backgroundColor: "#95c1dc",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#fff",
    borderWidth: 2,
  },
  purpleOption: {
    padding: 15,
    backgroundColor: "#b78dba",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#bbb",
    borderWidth: 2,
  },
  purpleOptionSelected: {
    padding: 15,
    backgroundColor: "#b78dba",
    width: 15,
    borderRadius: 20,
    margin: 5,
    borderColor: "#fff",
    borderWidth: 2,
  },
});

let colors = [
  [styles.pinkOption, styles.pinkOptionSelected],
  [styles.greenOption, styles.greenOptionSelected],
  [styles.blueOption, styles.blueOptionSelected],
  [styles.purpleOption, styles.purpleOptionSelected],
];

export default TileOptionButton;
