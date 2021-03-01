import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import BottomNavigator from './BottomNavigator';
import ProfileScreen from '../../screens/MainApp/ProfileScreen';
import EditProfileScreen from '../../screens/MainApp/EditProfileScreen';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainAppNavigator;
