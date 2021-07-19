import React,{useContext} from 'react';
import {View, TouchableOpacity, Text, Dimensions, Image} from 'react-native';
import {colors} from '../../constants/colors';
import Type from "../Shared/Type"

const {width, height} = Dimensions.get('screen');

const SongsList = ({item}) => {

	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={() => {

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
						source={{uri:"https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43"}}
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
							{item.trackName.length > 30
								? `${item.trackName.substring(0, 20)}....`
								: item.trackName}
						</Type>
					</View>

					<Type
						style={{
							fontSize: width / 26,
							color: '#D3D3D3',
						}}>
						{item.artistName}
					</Type>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default SongsList;
