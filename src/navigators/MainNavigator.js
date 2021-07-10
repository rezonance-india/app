import React, {useEffect, useState,useContext} from 'react';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Navigators
import MainAppNavigator from './MainApp/MainAppNavigator.js';
import HomeNavigator from './Home/HomeNavigator';
import {GlobalContext,GlobalProvider} from '../context/GlobalState.js';

const Stack = createStackNavigator();

const MainNavigator = () => {
	const [isReady, setIsReady] = useState(false);
	const [initialScreen, setInitialScreen] = useState('MainApp');
	const {user} = useContext(GlobalContext);

	LogBox.ignoreAllLogs(true);

	useEffect(() => {
		//? when auth will be implemented
		const checkToken = async () => {
			const user = await AsyncStorage.getItem('user');
			console.log(user,"user");
			  if (user) {
			    setInitialScreen('MainApp');
			  }
			  else {
				setInitialScreen("Home")
			  }
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
