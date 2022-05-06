import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const ExerciseGraph = (props) => {
  const [dataLength, setDataLength] = useState(0);

  return (
    <View style={styles.item}>
      <LineChart
        data={{
          datasets: [
            {
              data: props.data
                .slice(0, props.data.length - 1 ? dataLength - 2 : 1)
                .reverse(),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={400}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          paddingTop: 20,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "0",
            strokeWidth: "2",
          },
        }}
        bezier
        style={styles.graphStyle}
      />
      <View style={styles.buttonRow}>
        {[
          { value: 9, title: "Past 7" },
          { value: 32, title: "Past 30" },
          { value: props.data.length, title: "All" },
        ].map(({ value, title }) => {
          return (
            <TouchableOpacity
              style={styles.graphOptions}
              onPress={() => {
                if(props.data.length > value){
                  setDataLength(value);
                }
                else {
                  setDataLength(props.data.length)
                }
                
              }}
            >
              <Text style={styles.buttonFont}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#000",
    paddingTop: 20,
    borderRadius: 10,
  },
  graphStyle: {
    borderRadius: 16,
    marginBottom: -50,
  },
  graphOptions: {
    padding: 24,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "#1B1B1B",
    marginVertical: 10,
    marginHorizontal: 10,
    width: '25%',
    alignItems: 'center'
  },
  buttonFont: {
    color: "#fff",
  },
  buttonRow: {
    marginTop: -15,
    flexDirection: "row",
    justifyContent: "center",
    width: '100%'
  },
});

export default ExerciseGraph;
