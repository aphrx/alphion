import React, { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const SettingTile = (props) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const storeKey = props.storeKey
  const storeToggle = async () => {
      
      try {
        console.log(JSON.stringify(!isEnabled))
        await AsyncStorage.setItem(storeKey, JSON.stringify(!isEnabled))
      } catch (e) {
        console.log(e)
      }
      toggleSwitch()
  }

  useEffect(() => {
    AsyncStorage.getItem(storeKey, (err, value) => {
      if (err) {
          console.log(err)
      } else {
          setIsEnabled(JSON.parse(value)) // boolean false
      }
  })
  }, []);

  return (
    <View style={styles.item}>
      <View style={styles.subText}>
        <Text style={styles.muscleText}>{props.setting}</Text>
        <Switch
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
    alignItems: "baseline",
    backgroundColor: "#1B1B1B",
    marginVertical: 10,
  },
  itemInverse: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#353535",
    marginVertical: 10,
  },
  customText: {
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  muscleText: {
    paddingTop: 5,
    color: "#fff",
    justifyContent: "center",
    fontSize: 18,
    textTransform: "capitalize",
  },
  repText: {
    color: "#fff",
  },
  subText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // height: "100%"
  }
});

export default SettingTile;
