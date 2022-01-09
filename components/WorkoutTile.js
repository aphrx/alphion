import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import GreenImage from '../assets/workout_template.png';
import PinkImage from '../assets/workout_template_2.png';

const WorkoutTile = (props) => {

    const backgrounds = [PinkImage, GreenImage]

    return (
        <View style={styles.cardContainer}>
            <ImageBackground source={backgrounds[props.tileColour]} style={styles.item}>
                <Text style={styles.workoutText}>{props.workoutText}</Text>
                <Text style={styles.dateText}>{props.date}</Text>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer:{
        width: '100%',
        borderRadius: 50
    },
    item:{
        flexDirection: 'column',
        width: '100%',
        borderRadius: 50,
        height: 140,
        marginBottom: 20
    },
    workoutText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
        paddingTop: 10,
        paddingHorizontal: 20
    },
    dateText: {
        color: '#fff',
    }
});

export default WorkoutTile;