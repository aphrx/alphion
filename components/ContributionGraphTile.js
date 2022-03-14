import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

const ContributionGraphTile = (props) => {
  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 0,
    padding: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.item}>
      <ContributionGraph
        style={styles.graphStyle}
        values={[{ date: "2022-01-01", count: 0 }].concat(props.sessions)}
        endDate={props.endDate}
        numDays={105}
        width={Dimensions.get("window").width - 45}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "baseline",
    backgroundColor: "#1B1B1B",
    marginTop: 10,
  },
  graphStyle: {
    marginHorizontal: -12,
    marginBottom: -5,
    borderRadius: 16,
  },
});

export default ContributionGraphTile;
