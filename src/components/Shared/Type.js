import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../constants/colors';

const Type = (props) => {
	return (
		<Text {...props} style={{color: colors.text, ...props.style}}>
			{props.children}
		</Text>
	);
};

export default Type;
