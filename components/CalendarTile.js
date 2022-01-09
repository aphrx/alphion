import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalendarTile = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.dayText}>{props.date.format('ddd')}</Text>
            <Text style={styles.dateText}>{props.date.format('D')}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    item:{
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1B1B1B',
        width: '18%'
    },
    dayText: {
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase'
    },
    dateText: {
        color: '#fff',
    }
});

export default CalendarTile;