import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getPrevSession } from '../services/Database.js';
import PrevSessionTile from '../components/PrevSessionTile';
import ExerciseGraph from '../components/ExerciseGraph.js';

const ExerciseScreen = ({ route, navigation }) => {

    const { exerciseName, exerciseMuscle, exerciseId, workoutId } = route.params;
    const [prevSessions, setPrevSessions] = useState([]);
    const [sessionsTenRM, setSessionsTenRM] = useState([0])


    useEffect(() => {
      async function func(){
        let sid = await getPrevSession(workoutId, true);
        setPrevSessions(sid);
      }   
      func();
    }, [])

    const getSessionTenRM = async(index, tenrm) => {
      if(tenrm != undefined && tenrm != -Infinity){
        let tr = sessionsTenRM.splice(index, 0, tenrm)
       
        setSessionsTenRM([...sessionsTenRM, tr])
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.newWorkoutTile}>
            <Text style={styles.sectionTitle}>{exerciseName}</Text>
            <Text style={styles.subTitle}>{exerciseMuscle}</Text>
          </View>
        </View>
        <ExerciseGraph prevSessions={prevSessions} data={sessionsTenRM.reverse()}/>
        {
                prevSessions.map((obj, index) => {
                return <PrevSessionTile key={index} index={index} pSession={obj} wid={workoutId} eid={exerciseId} getTenRM={getSessionTenRM}/>
                } 
        )}
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    tasksWrapper: {
      paddingTop: 60,
      paddingHorizontal: 20
    },
    sectionTitle: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 0,

      textTransform: 'capitalize'
      //marginLeft: 25
    },
    subTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '100',
      marginTop: 0,
      marginBottom: 10,
      textTransform: 'capitalize'
      //marginLeft: 25
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
  });

export default ExerciseScreen;