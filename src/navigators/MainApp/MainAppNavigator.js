import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import BottomNavigator from './BottomNavigator';
import EditProfileScreen from '../../screens/MainApp/EditProfileScreen';
import ViewArtistScreen from '../../screens/MainApp/ViewArtistScreen';
import MessagingScreen from '../../screens/MainApp/MessagingScreen';
import ViewProfileScreen from "../../screens/MainApp/ViewProfileScreen";
import PlaylistScreen from '../../screens/MainApp/PlaylistScreen';

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
				<Stack.Screen 
					name="ViewProfileScreen"
					component={ViewProfileScreen}
					options={{headerShown:false}}
				/>
				<Stack.Screen 
					name="PlaylistScreen"
					component={PlaylistScreen}
					options={{headerShown:false}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default MainAppNavigator;
