import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ExerciseTile from '../components/ExerciseTile';
import { Exercises } from '../data/Exercises.js';

const AddExerciseScreen = ({ route, navigation }) => {
    const pagination = 20;
    const [exercises, setExercises] = useState(Exercises);
    const [exercisePagination, setExercisePagination] = useState(pagination);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
     }

    const renameWorkout = (txt) => {
        setExercises(filterSearch(txt));
    }

    const handleAddExercise = (id, exercise, muscle) => {
        Keyboard.dismiss();
        route.params.onReturn({id, exercise, muscle, sets:null, reps:null});
        navigation.goBack();
      }

    const filterSearch = (search) => {
        let temp = [];
        for (let i = 0; i < Exercises.length; i++) {
            if (Exercises[i].exercise.toLowerCase().includes(search.toLowerCase())) {
                temp.push(Exercises[i]);
            }
        }
        return temp
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onScroll={({nativeEvent})=>{
            if(isCloseToBottom(nativeEvent)){
                setExercisePagination(exercisePagination + pagination)
             }
        }}>
        <Text style={styles.sectionTitle}>Exercises</Text>
        <TextInput style={styles.input} placeholder={'Search'} placeholderTextColor={'#fff'} onChangeText={(text) => renameWorkout(text) }/>
        {
            exercises.slice(0, exercisePagination).map(({id, exercise, muscle }) => {
                return <TouchableOpacity key={id} onPress={() => handleAddExercise(id, exercise, muscle)}>
                    <ExerciseTile key={id} exercise={exercise} muscle={muscle}/>
                    </TouchableOpacity>
            })
        }
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      paddingTop: 60,
      paddingHorizontal: 20

    },
    sectionTitle: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 5
    },
    items: {
      marginTop: 30
    },
    writeTaskWrapper:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20
    },
    input:{
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#1B1B1B',
      color: '#fff',
      borderRadius: 15,
      width: '100%',
      marginVertical: 10
    },
    workoutWrapper:{
      flexDirection: "row",
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    workoutTileWrapper:{
      width: '47%',
    },
    newWorkoutTile:{
        borderRadius: 20
    },
    add: {
        color: '#fff',
        padding: 50,
        paddingVertical: 14,
        backgroundColor: '#0cc98f',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 3,
        margin: 20,
    },
    doneText: {
        color: '#fff',
        fontSize: 20
    },
    addExercise:{
        backgroundColor: '#1B1B1B',
        color: '#fff',
        padding: 50,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 20,
        elevation: 3,
        margin: 20,
        marginBottom: 0,
    },
    addExerciseText:{
        color: '#fff',
        fontSize: 20
    }
  });

export default AddExerciseScreen;