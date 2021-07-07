import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import InputBox from '../Shared/InputBox';

const SearchBox = ({setSearchQuery, searchQuery, navigation, placeholder}) => {
	return (
		<View
			style={{
				paddingLeft: 10,
				marginRight: 20,
				flexDirection: 'row',
			}}>
			<InputBox
				value={searchQuery}
				onChangeText={(value) => setSearchQuery(value)}
				placeholder={placeholder}
				style={{
					borderRadius: 6,
					flex:1,
					marginRight:-20,
					paddingLeft:20,
					borderColor:"transparent",
				}}
				autoFocus={true}
				icon={'X'}
				viewStyle={{
					flex: 1,
					flexDirection: 'row',
					paddingBottom: 10,
				}}
			/>
		</View>
	);
};

// hello() result -> "hello"

export default SearchBox;
