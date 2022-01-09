import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExerciseTile = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.exerciseText}>{props.exercise}</Text>
            <View style={styles.subText}>
                <Text style={styles.muscleText}>{props.muscle}</Text>
                {props.sets ? <Text style={styles.repText}>{props.reps} x {props.sets} sets</Text> : <></>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item:{
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'baseline',
        backgroundColor: '#1B1B1B',
        marginVertical: 10
    },
    exerciseText: {
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize'
    },
    muscleText: {
        color: '#fff',
        textTransform: 'capitalize'
    },
    repText: {
        color: '#fff',
    },
    subText:{
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default ExerciseTile;