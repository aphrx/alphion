import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PrevRepHeader from './PrevRepHeader';
import PrevRepTile from './PrevRepTile';
import { getSetsForExercise } from '../services/Database';
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment'

const screenWidth = Dimensions.get('window').width;

const PrevSessionTile = (props) => {
    const [setsList, setSetsList] = useState([]);
    const timestamp = moment(props.pSession.date);
    const [highestTenRM, setHighestTenRM] = useState(0)

    useEffect(() => {
        if(props.pSession.id != -1 && props.pSession.id != undefined){
            async function getSets() {
                let s = await getSetsForExercise(props.wid, props.pSession.id, props.eid)
                setSetsList(s);
                if(props.getTenRM){
                    findHighestTenRM(s);
                }           
            }
            getSets();
            
            
        }
    }, []);

    const findHighestTenRM = (s) => {
        let temp = []
        for(let i = 0; i < s.length; i++){
            temp.push((s[i].weight*s[i].reps)/10)
        }
        setHighestTenRM(Math.max(...temp))
        console.log("TRM", Math.max(...temp), "I", props.index)
        props.getTenRM(props.index, Math.max(...temp))
    }

    if(props.pSession.date == -1){
        return <View></View>
    }

    return (
        <View style={styles.item}>
            <Text style={styles.exerciseText}>{timestamp.format('MMMM Do YYYY')}</Text>
            <View style={styles.repView}>
                <PrevRepHeader />
                {setsList.map(({setIndex, weight, reps}) => {
                    return <PrevRepTile key={setIndex} index={setIndex} lbs={weight} reps={reps}/>
                })}
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
        marginVertical: 10,
        marginHorizontal: 20,
        width: screenWidth-40
    },
    exerciseText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 5,
        textTransform: 'capitalize'
    },
    repView:{
        marginTop: 10,
        width: '100%'
    },
    setWrapper:{
        backgroundColor: '#000',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center'
    },
    setNumber:{
        color: '#fff',
        fontSize: 30
    },
    setButton:{
        color: '#fff',
        fontSize: 30
    },
    setButtonText:{
        color: '#fff',
        fontSize: 25
    },
    setHeader: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        alignItems: 'center'
    },
    doneButton: {
        color: '#fff',
        padding: 50,
        paddingVertical: 14,
        backgroundColor: '#0cc98f',
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        margin: 20,
      },
      doneText: {
          color: '#fff',
          fontSize: 20
      }
});

export default PrevSessionTile;