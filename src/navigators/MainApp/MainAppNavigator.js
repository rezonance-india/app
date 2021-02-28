import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import SearchScreen from '../../screens/MainApp/SearchScreen';
import HomeScreen from '../../screens/MainApp/HomeScreen';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainAppNavigator;
