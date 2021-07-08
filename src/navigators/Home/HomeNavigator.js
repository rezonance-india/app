import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import SignUpScreen from '../../screens/Home/SignupScreen';
import LoginScreen from '../../screens/Home/LoginScreen';
import ForgotPasswordScreen from '../../screens/Home/ForgotPasswordScreen';
import OnboardingScreen from '../../screens/Home/OnboardingScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
	return (
		<>
			<Stack.Navigator initialRouteName="OnboardingScreen">
				<Stack.Screen 
					name ="OnboardingScreen"
					component={OnboardingScreen}
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
