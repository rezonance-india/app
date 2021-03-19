import React from 'react';
import {
	View,
	Text,
	Dimensions,
	Modal,
	Pressable,
	Image,
	StyleSheet,
	Alert,
} from 'react-native';
import Type from '../Shared/Type';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {useState} from 'react';
import LinearGradient from './LinearGradient';

const {width, height} = Dimensions.get('screen');

const ListItem = ({navigation, data}) => {
	const handlePress = () => {
		console.log('lol pressed');
		// return <Overlay open={true} />;
		setModalVisible(true);
	};

	const [modalVisible, setModalVisible] = useState(false);

	const options = [
		{
			name: 'Like',
			icon_name: 'heart-outline',
		},
		{
			name: 'Add to queue',
			icon_name: 'add-outline',
		},
		{
			name: 'Send to Friends',
			icon_name: 'rocket-outline',
		},
		{
			name: 'Add to Playlist',
			icon_name: 'musical-notes-outline',
		},
	];

	return (
		<View style={{flexDirection: 'row', width: '100%'}}>
			<View style={styles.centeredView}>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}>
					<LinearGradient
						bgcolors={{
							colorOne: '#00000000',
							colorTwo: '#000000FF',
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								{options.map((option, i) => (
									<View
										key={i}
										style={{
											flexDirection: 'column',
											alignContent: 'space-between',
											margin: 15,
										}}>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'flex-start',
											}}>
											<Icon
												name={option.icon_name}
												size={24}
												color="white"
											/>
											<Text
												style={{
													color: 'white',
													left: 70,
													fontFamily: 'open-sans',
													fontSize: 16,
												}}>
												{option.name}
											</Text>
										</View>
									</View>
								))}
							</View>
						</View>
					</LinearGradient>
				</Modal>
			</View>

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
							fontSize: width / 24,
							color: colors.text,
							fontWeight: 'bold',
						}}>
						{data.track_name.length > 10
							? `${data.track_name.substring(0, 10)}....`
							: data.track_name}
					</Type>

					<TouchableOpacity onPress={handlePress}>
						<Icon
							name="pause-outline"
							size={20}
							style={{
								color: 'white',
							}}
						/>
					</TouchableOpacity>
				</View>

				<Type
					style={{
						fontSize: width / 26,
						color: '#D3D3D3',
					}}>
					{data.artist_name}
				</Type>
			</View>
		</View>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	centeredView: {},
	modalView: {
		marginTop: '120%',
		// backgroundColor: '#000000',
		// zIndex: 100,
		width: '100%',
		height: '150%',
		// flex: 1,
		// opacity: 0.6,
	},
});
