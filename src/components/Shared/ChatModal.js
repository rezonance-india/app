import React, {useState,useContext} from 'react';
import {Modal, Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';
import SearchBox from '../Search/SearchBox';
import InputBox from './InputBox';
import LinearGradient from './LinearGradient';

const ChatModal = ({modalVisible, toggleVisibility}) => {
	const [searchQuery, setSearchQuery] = useState('');	
	const {user} = useContext(GlobalContext);

	const [searchResults,setSearchResults] = useState(user.friends);

	const search = (value) => {
        //Searching using regex
        let re = new RegExp(`^${value}`);
        
		let results = [];
		
        user.friends.map((friend) => {
            if(friend.name.match(re)){
                results.push(friend);
                setSearchResults(results);
            }
        })
	};

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
					colorOne: 'rgba(0, 0, 0, 0.3)',
					colorTwo: 'rgba(0, 0, 0, 1)',
				}}>
				<View>
					<View style={styles.modalView}>
						<SearchBox
							placeholder="Search Friends"
							searchQuery={searchQuery}
							setSearchQuery={search}
						/>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{
								color: 'white',
							}}>
							{searchResults.map((user, i) => (
								<View
									key={i}
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
											source={{"uri": "https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43"}}
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
												marginRight: 20,
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
		marginTop: 7.5,
		marginLeft: -10,
	},
	button: {
		backgroundColor: '#09a0eb',
		// backgroundColor: '#7200ca',
		height: 35,
		width: 70,
		opacity: 0.8,
		borderRadius: 5,
		paddingVertical: 7.5,
		alignContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	textButton: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

export default ChatModal;
