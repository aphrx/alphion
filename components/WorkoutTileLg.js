import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import GreenImage from '../assets/workout_template.png';
import PinkImage from '../assets/workout_template_2.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WorkoutTileLg = (props) => {

    const backgrounds = [PinkImage, GreenImage]
    const [date, setDate] = useState("")

    // useEffect(() => {
    //     if(props.sid != undefined){
    //         async function func(){
    //             let d = await getSessionStartTime()
    //             setDate(d)
    //             console.log(d)
    //         }  
    //         func();
            
    //     }
    //   }, [])

    return (
        <View style={styles.cardContainer}>
            <ImageBackground source={backgrounds[props.tileColour]} style={styles.item} imageStyle={{ borderRadius: 20}}>
                <View style={styles.imageInner}>
                    <Text style={styles.workoutText}>{props.workoutText}</Text>
                    <View style={styles.buttons}>
                        {props.isEditable ? <TouchableOpacity style={styles.editButton}><FontAwesome5 name={'pencil-alt'} style={styles.editIcon} onPress={() => props.onEdit()}solid /></TouchableOpacity>:<View/>}
                        {props.isDeletable ? <TouchableOpacity onPress={() => props.onDelete(props.wid)}><FontAwesome5 name={'trash-alt'} style={styles.trashText} solid /></TouchableOpacity> : <></>}
                    </View>
                </View>
                {/* <Text style={styles.timerStyle}>11:58</Text> */}
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer:{
    },
    item:{
        flexDirection: 'column',
        height: 150,
        marginBottom: 20
    },
    timerStyle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 50,
        paddingTop: 10,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    workoutText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 22,
        paddingTop: 10,
        paddingHorizontal: 20
    },
    dateText: {
        color: '#fff',
    },
    imageInner:{
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      editIcon:{
        color: '#fff',
        fontSize: 20,
        margin: 10
      },
      buttons:{
        flexDirection: "row",
        margin: 10
    },
    trashText:{
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
        marginRight: 10
    },
});

export default WorkoutTileLg;