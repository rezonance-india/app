import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SongSearch from '../../components/Search/SongSearch';
import ArtistSearch from '../../components/Search/ArtistSearch';
import AlbumSearch from '../../components/Search/AlbumSearch';
import {colors} from '../../constants/colors';
import FriendSearch from '../../components/Search/FriendSearch';
const {width, height} = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

const SearchScreen = () => {
	return (
		<Tab.Navigator
			initialRouteName="Songs"
			tabBarOptions={{
				showLabel: true,
				activeTintColor: 'white',
				labelStyle: {
					color: 'white',
					marginTop: 35,
					fontSize: 16,
					fontFamily: 'NotoSans-Regular',
				},
				indicatorStyle: {
					backgroundColor: 'white',
					width: "15%",
					left: '5%',
					top: '110%',
				},
				style: {
					height: height / 12,
					backgroundColor: "rgb(15, 15, 15)",
				},
			}}>
			<Tab.Screen name="Songs" component={SongSearch} />
			<Tab.Screen name="Artists" component={ArtistSearch} />
			<Tab.Screen name="Albums" component={AlbumSearch} />
			<Tab.Screen name="Friends" component={FriendSearch} />
		</Tab.Navigator>
	);
};

export default SearchScreen;
