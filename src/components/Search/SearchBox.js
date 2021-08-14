import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import InputBox from '../Shared/InputBox';

const SearchBox = ({setSearchQuery, searchQuery, navigation, placeholder}) => {
	return (
		<View
			style={{
				marginLeft:10,
				paddingRight:5,
				marginRight:-100,
				flexDirection: 'row',
			}}>
			<InputBox
				value={searchQuery}
				searchbox={true}
				onChangeText={(value) => setSearchQuery(value)}
				placeholder={placeholder}
				style={{
					borderRadius: 6,
					flex:0.8,
					color:"black",
					opacity:0.5,
					marginRight:-150,
					borderColor:"transparent",
				}}
				autoFocus={true}
				icon={true}
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
