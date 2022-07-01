import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import Avatar from "../components/Avatar";
import SettingTile from "../components/SettingTile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ProfileScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMetric, setIsMetric] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name={"angle-left"} style={styles.backIcon} solid />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Account</Text>
      </View>

      <SettingTile setting="Beta Features" storeKey="@beta_feature" isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
      <SettingTile setting="Enable Metric" storeKey="@metric_weight" isEnabled={isMetric} setIsEnabled={setIsMetric}/>
      <View style={styles.avatarContainer}>
        {!isEnabled ? <></> : <Avatar />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 20 : 60,
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backIcon: {
    color: "#fff",
    fontSize: 30,
    paddingTop: 4,
    paddingRight: 10,
  },
  titleHeader: {
    flexDirection: "row",
    margin: 5,
  },
  avatarContainer: {
    // backgroundColor: "#fff",
    // padding: 5,
  },
});

export default ProfileScreen;
