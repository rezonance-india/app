import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const Header = ({navigation, isBack, heading, style, iconName, iconAction}) => {
	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<>
			<View
				style={{
					marginBottom: 8,
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: colors.background,
					height: height / 25,
					...style,
				}}>
				<View
					style={{
						position: 'absolute',
						width: '100%',
					}}>
					<View
						style={{
							fontSize: width / 20,
							textAlign: 'center',
							margin: 5,
							fontWeight: 'bold',
						}}>
						<Text style={{color: colors.text, textAlign: 'center'}}>
							{heading ? heading : 'Rezonance'}
						</Text>
					</View>
				</View>
				{/* 
				{navigation.canGoBack() && isBack ? (
					<TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
						<Icon
							name="chevron-back-outlined"
							size={22}
							style={{margin: 5, colors: colors.text}}
						/>
					</TouchableOpacity>
				) : null} */}

				{iconName && (
					<TouchableOpacity
						activeOpacity={0.75}
						style={{position: 'absolute', right: 0, padding: 5}}
						onPress={
							typeof iconAction === 'function' ? iconAction : null
						}>
						<Icon
							name="settings-sharp"
							size={width / 20}
							style={{margin: 5, color: colors.text}}
						/>
					</TouchableOpacity>
				)}
			</View>
		</>
	);
};

export default Header;
