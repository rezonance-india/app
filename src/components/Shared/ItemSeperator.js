import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../constants/colors';

export const ItemSeparator = ({widthPercentage = '90%', opacityHex = '55'}) => {
	return (
		<View
			style={{
				width: widthPercentage,
				height: 0.5,
				backgroundColor: colors.disabled + opacityHex,
				alignSelf: 'center',
			}}></View>
	);
};

export default ItemSeparator;
