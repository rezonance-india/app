import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Navigators
import MainAppNavigator from './MainApp/MainAppNavigator.js';
import HomeNavigator from './Home/HomeNavigator';
import {GlobalProvider} from '../context/GlobalState.js';

const Stack = createStackNavigator();

const MainNavigator = () => {
	const [isReady, setIsReady] = useState(false);
	const [initialScreen, setInitialScreen] = useState('MainApp');

	LogBox.ignoreAllLogs(true);

	useEffect(() => {
		//? when auth will be implemented
		const checkToken = async () => {
			const user = await AsyncStorage.getItem('user');
			//   if (user) {
			//     setInitialScreen('MainApp');
			//   }
			setIsReady(true);
		};
		checkToken();
	}, []);

	if (!isReady) {
		return null;
	}
	console.log(initialScreen,"in");
	return (
		<GlobalProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={initialScreen}>
					<Stack.Screen
						name="MainApp"
						component={MainAppNavigator}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name="Home"
						component={HomeNavigator}
						options={{headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</GlobalProvider>
	);
};

export default MainNavigator;
