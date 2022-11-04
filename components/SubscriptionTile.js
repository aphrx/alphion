import React, { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import alphionPlusLogo from "../assets/alphion_plus.png";
import IAP from 'react-native-iap';
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const productIds = ['002']

const SubscriptionTile = (props) => {

  const [user, setUser] = useState({
    name: 'Amal',
    subscription: undefined
  })

  useEffect(() => {
    IAP.getProducts(productIds).then((res) => {
      console.log(res);
    });
  }, [])
  
  return (
    <View style={styles.wrapper}>
    <View style={styles.item}>
      <Image
        source={alphionPlusLogo}
        style={styles.logo}
      />
      </View>
      <Text style={styles.muscleText}>Unlock all of our features to get the most out of the app</Text>
      <TouchableOpacity
            style={styles.button}
            onPress={() => {}}
          ><Text style={styles.buttonText}>Upgrade from $0.99</Text>
          </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper:{
    flexDirection:"column",
    width: '100%',
    padding: 15,
    borderRadius: 10,    
    backgroundColor: "#0cc98f",
    marginVertical: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: "row",
    justifyContent: 'center'

  },
  muscleText: {
    paddingTop: 5,
    color: "#fff",
    justifyContent: "center",
    textAlign: 'center',
    fontSize: 16
  },
  logo: {
    width: 120,
    resizeMode: 'contain',
    height: 50
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#1B1B1B",
    fontSize: 14,
    textAlign: 'center'
  },
});

export default SubscriptionTile;
