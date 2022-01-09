import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme  } from '@react-navigation/native';
import WorkoutScreen from './screens/WorkoutScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import EditWorkoutScreen from './screens/EditWorkoutScreen';
import ViewWorkoutScreen from './screens/ViewWorkoutScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import LiveWorkoutScreen from './screens/LiveWorkoutScreen';
import ExerciseScreen from './screens/ExerciseScreen';

const Stack = createStackNavigator()

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="WorkoutScreen">
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        <Stack.Screen name="AddWorkoutScreen" component={AddWorkoutScreen} />
        <Stack.Screen name="EditWorkoutScreen" component={EditWorkoutScreen} />
        <Stack.Screen name="ViewWorkoutScreen" component={ViewWorkoutScreen} />
        <Stack.Screen name="AddExerciseScreen" component={AddExerciseScreen} />
        <Stack.Screen name="LiveWorkoutScreen" component={LiveWorkoutScreen} />
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}

export default App;