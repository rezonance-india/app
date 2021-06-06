import React from 'react';
import {View, Text} from 'react-native';
import {ACCENT, colors, PRIMARY} from '../../constants/colors';
import LinearGradientComp from '../Shared/LinearGradient';
import SearchBox from './SearchBox';

const SongSearch = () => {
	console.log('search song');
	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: colors.search,
				colorTwo: colors.search,
			}}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text style={{color: 'white'}}>Home!</Text>
			</View>
			{/* <SearchBox /> */}
		</LinearGradientComp>
	);
};

export default SongSearch;
