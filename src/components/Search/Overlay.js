import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from '../Shared/LinearGradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import {useState} from 'react';

const Overlay = ({toggleVisibility, modalVisible, data}) => {
	const [liked, setLiked] = useState(false);
	const [heartIcon, setHeartIcon] = useState('heart-outline');

	const options = [
		{
			name: 'Like',
			icon_name: heartIcon,
			onPress: () => {
				setLiked(!liked);
				liked ? setHeartIcon('heart') : setHeartIcon('heart-outline');
			},
		},
		{
			name: 'Add to queue',
			icon_name: 'add-outline',
			onPress: () => {},
		},
		{
			name: 'Send to Friends',
			icon_name: 'rocket-outline',
			onPress: () => {},
		},
		{
			name: 'Add to Playlist',
			icon_name: 'musical-notes-outline',
			onPress: () => {},
		},
		{
			name: 'View artist',
			icon_name: 'person-add-outline',
			onPress: () => {},
		},
	];

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradient
				bgcolors={{
					colorOne: 'rgba(0,0,0,0.2)',
					colorTwo: 'black',
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View>{/* <Image source={} /> */}</View>
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
									<TouchableOpacity onPress={option.onPress}>
										<Icon
											name={option.icon_name}
											size={24}
											style={{left: 10}}
											color="white"
										/>
									</TouchableOpacity>
									<Text style={styles.options}>
										{option.name}
									</Text>
								</View>
							</View>
						))}
						{/* 
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
							}}>
							<OctIcon
								style={{margin: 15}}
								name="versions"
								size={24}
								color="white"
							/>
							<Text style={styles.options}>
								Get recommendations
							</Text>
						</View> */}
					</View>
				</View>
			</LinearGradient>
		</Modal>
	);
};

export default Overlay;

const styles = StyleSheet.create({
	modalView: {
		marginTop: '120%',
		width: '100%',
		height: '150%',
	},
	options: {
		color: 'white',
		left: 70,
		fontFamily: 'open-sans',
		fontSize: 16,
	},
});
