import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import WelcomeScreen from '../../screens/Home/WelcomeScreen';
import SignUpScreen from '../../screens/Home/SignupScreen';
import LoginScreen from '../../screens/Home/LoginScreen';
import ForgotPasswordScreen from '../../screens/Home/ForgotPasswordScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
	return (
		<>
			<Stack.Navigator initialRouteName="WelcomeScreen">
				<Stack.Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="SignUpScreen"
					component={SignUpScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="ForgotPasswordScreen"
					component={ForgotPasswordScreen}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default HomeNavigator;
