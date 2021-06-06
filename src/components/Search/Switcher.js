import * as React from 'react';
import {Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SongSearch from './SongSearch';
import ArtistSearch from './ArtistSearch';
import AlbumSearch from './AlbumSearch';
import {ACCENT, colors, PRIMARY} from '../../constants/colors';
const {width, height} = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const Switcher = () => {
	return (
		<Tab.Navigator
			initialRouteName="Songs"
			tabBarOptions={{
				showLabel: true,
				labelStyle: {
					color: 'white',
					marginTop: 20,
					fontSize: 16,
					fontFamily: 'NotoSans-Regular',
				},
				indicatorStyle: {
					backgroundColor: 'white',
					width: 50,
					left: '10%',
					top: '105%',
				},
				style: {
					height: height / 15,
					backgroundColor: colors.search,
				},
			}}>
			<Tab.Screen name="Songs" component={SongSearch} />
			<Tab.Screen name="Artists" component={ArtistSearch} />
			<Tab.Screen name="Albums" component={AlbumSearch} />
		</Tab.Navigator>
	);
};

export default Switcher;
