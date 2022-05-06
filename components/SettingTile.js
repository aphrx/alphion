import React, { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingTile = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const storeKey = props.storeKey;
  const storeToggle = async () => {
    try {
      await AsyncStorage.setItem(storeKey, JSON.stringify(!isEnabled));
    } catch (e) {}
    toggleSwitch();
  };

  useEffect(() => {
    AsyncStorage.getItem(storeKey, (err, value) => {
      if (err) {
        console.log(err);
      } else {
        setIsEnabled(JSON.parse(value)); // boolean false
      }
    });
  }, []);

  return (
    <View style={styles.item}>
      <View style={styles.subText}>
        <Text style={styles.muscleText}>{props.setting}</Text>
        <Switch
          style={styles.switch}
          ios_backgroundColor="#3e3e3e"
          onValueChange={storeToggle}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#1B1B1B",
    marginVertical: 10,
  },
  muscleText: {
    paddingTop: 5,
    color: "#fff",
    justifyContent: "center",
    fontSize: 18,
    textTransform: "capitalize",
  },
  subText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    width: "100%",
    // height: "100%"
  },
  switch:{
    alignItems: "center"
  }
});

export default SettingTile;
