import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Type from '../Shared/Type';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const ListItem = ({navigation, data}) => {
	return (
		<View style={{flexDirection: 'row', width: '100%'}}>
			<View
				style={{
					width: width / 7,
					height: width / 7,
					borderRadius: 1,
					marginVertical: 5,
					marginHorizontal: 10,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Image
					source={{
						uri: data.album_image,
					}}
					style={{
						width: 50,
						height: 50,
					}}
				/>
			</View>
			<View
				style={{
					marginVertical: 10,
					marginHorizontal: 15,
					justifyContent: 'space-around',
					flex: 1,
				}}>
				<Type style={{fontSize: width / 24, color: colors.text}}>
					{data.track_name}
				</Type>

				<View
					style={{
						flexDirection: 'row',
						marginTop: 5,
						flex: 1,
					}}>
					<Type style={{fontSize: width / 24, color: colors.text}}>
						{data.album_name}
					</Type>

					<Type
						style={{
							fontSize: width / 26,
							color: colors.disabled,
							paddingLeft: 10,
						}}>
						{data.artist_name}
					</Type>
				</View>
			</View>
		</View>
	);
};

export default ListItem;
