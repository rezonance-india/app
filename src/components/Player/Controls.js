import React, {Component, useState} from 'react';
import {defaultString} from './config';
import Icon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import RNFetchBlob from 'rn-fetch-blob';

import {View, Text, StyleSheet, Image, TouchableOpacity,PermissionsAndroid, ToastAndroid} from 'react-native';
import ChatModal from '../Shared/ChatModal';
import Recommend from '../Shared/Recommend';

const Controls = ({
	selectedSong,
	liked,
	onPressLike,
	paused,
	shuffleOn,
	repeatOn,
	onPressPlay,
	onPressPause,
	onBack,
	onForward,
	onPressShuffle,
	onPressRepeat,
	backwardDisabled,
	forwardDisabled,
	navig
}) => {
	const [chatModalVisible, setChatModalVisible] = useState(false);
	const [recommendModalVisible, setRecommendModalVisible] = useState(false);


  const REMOTE_IMAGE_PATH =
    selectedSong.track_url
  	
	const checkPermission = async () => {

		if (Platform.OS === 'ios') {
			downloadImage();
		} else {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'Storage Permission Required',
						message:
						'App needs access to your storage to download Photos',
					}
				);

				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					console.log('Storage Permission Granted.');
					downloadImage();
				}
				else {
					ToastAndroid.show("Storage Permission Not Granted", ToastAndroid.SHORT);
				}
			}
			catch (err) {
				console.warn(err);
			}
		}
	};

 	const downloadImage = () => {

    	let media_URL = REMOTE_IMAGE_PATH;    
    
    	let ext = getExtention(media_URL);
    	
		ext = '.' + ext[0];
    
		const { config, fs } = RNFetchBlob;
		
		let PictureDir = fs.dirs.PictureDir;

		let options = {
			fileCache: true,
			addAndroidDownloads: {
				useDownloadManager: true,
				notification: true,
				path:
				PictureDir +
				'/song_' + 
				selectedSong.track_name +
				ext,
				description: 'Media',
			},
		};

		config(options)
			.fetch('GET', media_URL)
			.then(res => {
			console.log('res -> ', JSON.stringify(res));
			ToastAndroid.show("Downloaded Successfully", ToastAndroid.SHORT);
		});
  	};

  	const getExtention = filename => {
    	return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  	};

	return (
		<View style={styles.container}>
			<View>
				<ChatModal
					selectedSong={selectedSong}
					toggleVisibility={setChatModalVisible}
					modalVisible={chatModalVisible}
				/>
				<Recommend
					navig={navig}
					toggleVisibility={setRecommendModalVisible}
					modalVisible={recommendModalVisible}
				/>
				<View
					style={{
						width: '100%',
						bottom: '10%',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<TouchableOpacity
						activeOpacity={0}
						onPress={checkPermission}>
						<Icon
							size={30}
							name="download-outline"
							style={[
								{color: defaultString.darkColor}
							]}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							console.log('lol');
							onPressLike();
						}}>
						{liked ? (
							<Icon
								size={30}
								name="heart"
								style={[
									{
										color: defaultString.darkColor,
									},
								]}
							/>
						) : (
							<Icon
								size={30}
								name="heart-outline"
								style={[
									{
										color: defaultString.darkColor,
									},
								]}
							/>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setRecommendModalVisible(true);
						}}>
						<OctIcon
							size={30}
							name="versions"
							style={[{color: defaultString.darkColor}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							console.log('sending to the moon');
							setChatModalVisible(true);
						}}>
						<Icon
							size={30}
							name="rocket-outline"
							style={[{color: defaultString.darkColor}]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.0}
						onPress={onPressRepeat}>
						<Icon
							size={30}
							name="repeat-outline"
							style={[
								{color: defaultString.darkColor},
								repeatOn ? [] : styles.off,
							]}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						marginLeft: '20%',
						top: '5%',
						width: '60%',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}>
					<TouchableOpacity
						onPress={onBack}
						disabled={backwardDisabled}>
						<Icon
							size={40}
							name="play-skip-back-circle-outline"
							style={[
								{
									color: defaultString.darkColor,
								},
								backwardDisabled && {opacity: 0.3},
							]}
						/>
					</TouchableOpacity>
					{!paused ? (
						<TouchableOpacity onPress={onPressPause}>
							<View style={styles.playButton}>
								<Icon
									size={40}
									name="pause-outline"
									style={{
										color: defaultString.darkColor,
									}}
								/>
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={onPressPlay}>
							<View style={styles.playButton}>
								<Icon
									size={40}
									name="play-outline"
									style={{
										color: defaultString.darkColor,
										marginLeft: 5,
									}}
								/>
							</View>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						onPress={onForward}
						disabled={forwardDisabled}>
						<Icon
							size={40}
							name="play-skip-forward-circle-outline"
							style={[
								forwardDisabled && {opacity: 0.3},
								{color: defaultString.darkColor},
							]}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Controls;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '15%',
	},
	playButton: {
		height: 72,
		width: 72,
		bottom: '15%',
		borderColor: defaultString.darkColor,
		borderRadius: 72 / 2,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	off: {
		opacity: 0.3,
	},
});
