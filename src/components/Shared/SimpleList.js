import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import {colors} from '../../constants/colors';
import Type from './Type';

const {width, height} = Dimensions.get('screen');

const SimpleList = ({item, artist_details}) => {
	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => {
				console.log('pressed');
			}}>
			<View style={{flexDirection: 'row', width: '100%'}}>
				<View
					style={{
						width: width / 7,
						height: width / 7,
						borderRadius: 1,
						marginVertical: 10,
						marginHorizontal: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Image
						source={{
							uri: artist_details
								? item.album_img
								: item.track_img,
						}}
						style={{
							width: 50,
							height: 50,
							borderRadius: 6,
							overflow: 'hidden',
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
					<View
						style={{
							flexDirection: 'row',
							marginTop: 5,
							justifyContent: 'space-between',
							flex: 1,
							width: '100%',
						}}>
						<Type
							style={{
								fontSize: width / 22,
								width: '80%',
								color: colors.text,
								fontFamily: 'IBMPlexSans-Bold',
								fontWeight: 'bold',
							}}>
							{artist_details
								? item.album_name.length > 30
									? `${item.album_name.substring(0, 20)}....`
									: item.album_name
								: item.track_name.length > 30
								? `${item.track_name.substring(0, 20)}....`
								: item.track_name}
						</Type>
					</View>

					<Type
						style={{
							fontSize: width / 26,
							color: '#D3D3D3',
						}}>
						{artist_details ? item.artist_name : item.artist_name}
					</Type>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SimpleList;
