import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import InputBox from '../Shared/InputBox';

const SearchBox = ({setSearchQuery, searchQuery, navigation}) => {
	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: 30,
				paddingBottom: 10,
				backgroundColor: colors.background,
				flexDirection: 'row',
			}}>
			<InputBox
				value={searchQuery}
				onChangeText={(value) => setSearchQuery(value)}
				placeholder="Search song/artists"
				// label={'search'}
				style={{
					borderRadius: 5,
				}}
				// handleIconPress={pressIcon}
				autoFocus={true}
				icon={'X'}
				viewStyle={{
					flex: 1,
					flexDirection: 'row',
					borderBottomWidth: 1,
					paddingBottom: 10,
				}}
			/>
		</View>
	);
};

export default SearchBox;
