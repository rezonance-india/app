import React from 'react';

import {Dimensions, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//Colors
import {colors, GRAY, PRIMARY} from '../../constants/colors';

//Screens
import HomeScreen from '../../screens/MainApp/HomeScreen';
import ChatScreen from '../../screens/MainApp/ChatScreen';
import SearchScreen from '../../screens/MainApp/SearchScreen';
import PlayerScreen from '../../screens/MainApp/PlayerScreen';
import ProfileScreen from '../../screens/MainApp/ProfileScreen';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const BottomNavigator = ({navigation}) => {
	return (
		<>
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
						else if(route.name === "PlayerScreen"){
							iconName = "disc-outline"
						}
						else if(route.name === "ProfileScreen"){
							iconName="person-outline"
						}
						return (
							<Icon name={iconName} size={size} color={color} />
						)
					},
				})}
				tabBarOptions={{
					activeTintColor: 'white',
					inactiveTintColor: colors.disabled,
					keyboardHidesTabBar: true,
					showLabel: false,
					style: {
						backgroundColor: 'rgb(23, 23, 23)',
						height: height / 15,
						borderTopWidth: 0,
					},
				}}>
				<Tab.Screen name="HomeScreen" component={HomeScreen} />
				<Tab.Screen name="SearchScreen" component={SearchScreen} />
				<Tab.Screen name="PlayerScreen" component={PlayerScreen}/>
				<Tab.Screen name="ChatScreen" component={ChatScreen} />
				<Tab.Screen name="ProfileScreen" component={ProfileScreen} initialParams={{
					imageUrl:"https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80"
				}}/>
			</Tab.Navigator>
		</>
	);
};

export default BottomNavigator;
