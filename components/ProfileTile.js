import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import alphionPlusLogo from "../assets/alphion_plus.png";
import { Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

const ProfileTile = (props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => pickImage()}>
        <FontAwesome5 name={"user-circle"} style={styles.profileIcon} solid />
        <View style={styles.editView}>
            <Text style={styles.editText}>Edit Image</Text>

        </View>
        
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: "column",
    marginVertical: 10,
    justifyContent:'center',
    alignItems: 'center'

  },
  profileIcon: {
    color: "#fff",
    fontSize: 90,
  },
  editText: {
    color: "#fff",
    justifyContent:'center',
  },
  editIcon: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
  },
  editView: {
    flexDirection: "row",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileTile;
