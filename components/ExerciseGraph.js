import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ExerciseGraph = (props) => {
  return (
    <View style={styles.item}>
      <LineChart
        data={{
          datasets: [
            {
              data: props.data.slice(
                props.data.length - 1 ? 2 : 0,
                props.data.length
              ),
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
            r: "6",
            strokeWidth: "2",
          },
        }}
        bezier
        style={styles.graphStyle}
      />
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
    marginBottom: -50
  },
});

export default ExerciseGraph;
