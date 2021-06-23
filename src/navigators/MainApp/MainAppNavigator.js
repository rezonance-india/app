import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import BottomNavigator from './BottomNavigator';
import ProfileScreen from '../../screens/MainApp/ProfileScreen';
import EditProfileScreen from '../../screens/MainApp/EditProfileScreen';
import ViewArtistScreen from '../../screens/MainApp/ViewArtistScreen';
import OnboardingScreen from '../../screens/Home/OnboardingScreen';
import MessagingScreen from '../../screens/MainApp/MessagingScreen';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
	return (
		<>
			<Stack.Navigator initialRouteName="OnboardingScreen">
				<Stack.Screen 
					name ="OnboardingScreen"
					component={OnboardingScreen}
					options={{headerShown: false}}
				/>
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
				<Stack.Screen
					name="ViewArtistScreen"
					component={ViewArtistScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen 
					name="MessagingScreen"
					component={MessagingScreen}
					options={{headerShown:false}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default MainAppNavigator;
