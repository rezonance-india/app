import React, {useState} from 'react';
import {Text, View, ScrollView, Image, StyleSheet} from 'react-native';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import {ACCENT, PRIMARY} from '../../constants/colors';
import {userData} from '../../constants/store';

const ChatScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const search = () => {
		console.log('in search frands');
	};
	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: PRIMARY,
				colorTwo: ACCENT,
			}}>
			<View
				style={{
					marginTop: 30,
				}}>
				<SearchBox
					placeholder="Search Messages"
					searchQuery={searchQuery}
					setSearchQuery={search}
				/>
			</View>

			<Text
				style={{
					top: 5,
					fontSize: 18,
					color: 'white',
					marginBottom: 10,
					marginLeft: 20,
					letterSpacing: 0,
					fontFamily: 'NotoSans-Regular',
				}}>
				Messages
			</Text>
			<View>
				<ScrollView
					showsVerticalScrollIndicator={true}
					style={{
						color: 'white',
						marginTop: 10,
					}}>
					{userData.map((user, i) => (
						<View
							key={i}
							style={{
								flexDirection: 'column',
								margin: '2%',
								height: '10%',
								// borderTopWidth: 1,
								// borderTopColor: 'rgba(255, 255, 2555, 0.5)',
							}}>
							<View
								style={{
									flexDirection: 'row',
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
								<View
									styel={{
										flex: 1,
									}}>
									<View
										style={{
											flexDirection: 'row',
										}}>
										<Text style={styles.options}>
											{user.name.length > 30
												? user.name.substring(0, 30) +
												  '...'
												: user.name}
										</Text>
									</View>
									<View
										style={{
											maxWidth: '80%',
											flexDirection: 'row',
										}}>
										<Text
											style={{
												...styles.options,
												fontSize: 14,
												marginTop: 2,
												fontFamily: 'NotoSans-Regular',
											}}>
											You shared song, Vertigo By Khalid.
										</Text>
										<Text
											style={{
												...styles.options,
												marginTop: -25,
											}}>
											3hr
										</Text>
									</View>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
		</LinearGradientComp>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	modalView: {
		marginTop: '100%',
		width: '100%',
		height: '50%',
	},
	options: {
		color: 'white',
		fontFamily: 'NotoSans-Bold',
		fontSize: 16,
		marginLeft: 30,
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
