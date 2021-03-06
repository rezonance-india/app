import React from 'react';

import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';

//Colors
import {colors, GRAY, PRIMARY} from '../../constants/colors';
import HomeScreen from '../../screens/MainApp/HomeScreen';
import SearchScreen from '../../screens/MainApp/SearchScreen';
import ChatScreen from '../../screens/MainApp/ChatScreen';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const BottomNavigator = ({navigation}) => {
	return (
		<Tab.Navigator
			initialRouteName="HomeScreen"
			screenOptions={({route}) => ({
				tabBarIcon: ({focused, color, size}) => {
					let iconName;
					if (route.name === 'HomeScreen') {
						iconName = 'home-outline';
					} else if (route.name === 'SearchScreen') {
						iconName = 'search-outline';
					} else if (route.name === 'ChatScreen') {
						iconName = 'chatbox-outline';
					}
					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: colors.active,
				inactiveTintColor: colors.disabled,
				keyboardHidesTabBar: true,
				showLabel: false,
				style: {
					backgroundColor: colors.background,
					// position: 'absolute',
					// left: 0,
					// right: 0,
					// bottom: 0,
					// elevation: 0,
					// borderTopColor: 'transparent',
					// opacity: 0.5,
					height: height / 12,
					borderTopWidth: 0,
				},
			}}>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			<Tab.Screen name="SearchScreen" component={SearchScreen} />
			<Tab.Screen name="ChatScreen" component={ChatScreen} />
		</Tab.Navigator>
	);
};

export default BottomNavigator;
