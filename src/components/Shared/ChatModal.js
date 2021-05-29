import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {userData} from '../../constants/store';
import SearchBox from '../Search/SearchBox';
import InputBox from './InputBox';
import LinearGradient from './LinearGradient';

const ChatModal = ({modalVisible, toggleVisibility}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const search = () => {
		console.log('in seearch frands');
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradient
				bgcolors={{
					colorOne: '#2d3436AF',
					colorTwo: '#272829',
				}}>
				<View>
					<View style={styles.modalView}>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{
								color: 'white',
							}}>
							<SearchBox
								placeholder="Search Friends"
								searchQuery={searchQuery}
								setSearchQuery={search}
							/>
							{userData.map((user, i) => (
								<View
									style={{
										flexDirection: 'column',
										alignContent: 'space-between',
										margin: '2%',
									}}>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'flex-start',
										}}>
										<Image
											source={{uri: user.image}}
											style={{
												borderRadius: 20,
												left: 10,
												width: 50,
												height: 50,
											}}
										/>
										<Text style={styles.options}>
											{user.name}
										</Text>
										<View
											style={{
												flex: 1,
												flexDirection: 'row',
												justifyContent: 'flex-end',
												marginRight: 10,
											}}>
											<View style={styles.button}>
												<Text style={styles.textButton}>
													Send
												</Text>
											</View>
										</View>
									</View>
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</LinearGradient>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalView: {
		marginTop: '100%',
		width: '100%',
		height: '50%',
	},
	options: {
		color: 'white',
		left: 70,
		fontWeight: 'bold',
		fontFamily: 'Open Sans',
		fontSize: 16,
		marginTop: 2,
		marginLeft: -10,
	},
	button: {
		backgroundColor: '#09a0eb',
		height: 35,
		width: 70,
		borderRadius: 5,
		paddingVertical: 6,
	},
	textButton: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default ChatModal;
