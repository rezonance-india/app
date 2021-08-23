import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
	ImageBackground,
	Modal,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
} from 'react-native';
import {ACCENT, PRIMARY} from '../../constants/colors';
import LinearGradientComp from './LinearGradient';
import {useContext} from 'react';
import {GlobalContext} from '../../context/GlobalState';
import {apiUrl} from '../../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const Recommend = ({modalVisible, toggleVisibility,navig,selectedSong}) => {
	const [result, setResult] = useState([]);
	const {queue,selectedTrack,color,updateQueue} = useContext(GlobalContext);

	const renderer = ({item}) => {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => {
					const trackDetails = queue;
					trackDetails[selectedTrack] = {
						title: item.track_name,
						artist: item.artist_name,
						artwork: item.album_image,
						url: item.track_url,
						id: item.track_id,
					};
					updateQueue(trackDetails);
					const persistingData = async () => {
						await AsyncStorage.setItem(
							'queue',
							JSON.stringify(trackDetails),
						);
					};
					persistingData();
					navig.navigate('PlayerScreen');
					toggleVisibility(!modalVisible);
				}}>

					<ImageBackground
						source={{uri: item.album_image}}
						style={styles.album}
						imageStyle={{borderRadius: 10}}>
			
						<View
							style={{
								height: '20%',
								top: '80%',
								width: '100%',
								backgroundColor: '#000',
								opacity: 0.75,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
							}}></View>

						<Text
							style={{
								...styles.text,
								fontSize: 18,
								fontFamily: 'NotoSans',
								fontWeight: 'bold',
							}}>
								{/* <BlurView
									style={styles.absolute}
									blurType="regular"
									blurAmount={60}
								/> */}
							{item.track_name.length > 40
								? `${item.track_name.substring(0, 35)}...`
								: item.track_name}
						</Text>
						<Text style={{...styles.text, fontSize: 14}}>
							{item.artist_name.length > 30
								? `${item.artist_name.substring(0, 25)}...`
								: item.artist_name}
						</Text>
					</ImageBackground>
				</TouchableOpacity>
			</View>
		);
	};
	// console.log("This should print queue 0", queue[0]);
	useEffect(() => {
		if(modalVisible){
			if(queue[selectedTrack].id === "trending" || selectedSong?.ref_id ==="trending"){
				console.log("in trending");
				axios
					.get(
						`${apiUrl}trending/tracks`
						)
						.then((res) => {
						let recommArray =[];
						const ranNo = Math.floor(Math.random() * (res.data.length - 21)) +11;
						
						for(let i=ranNo;i<=ranNo+10;i++){
							recommArray.push(res.data[i]);
						}
						setResult(recommArray);
					})
					.catch((err) => {
						console.log(err,"error");
					});
			}
			else{
				console.log("else trending");
				axios
					.post(
						`${apiUrl}recommend`,
						{
							ref_id: selectedSong ? selectedSong.ref_id : queue[selectedTrack].id,
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						},
					)
					.then((res) => {
						setResult(res.data);
					})
					.catch((err) => {
						console.log(err,"errors");
					});
			}
		}
	}, [modalVisible]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradientComp
				bgcolors={{
					// colorOne: color ? color : 'rgba(44,62,80, 1)',
					colorOne: 'rgba(0, 0,01, 0.85)',
					colorTwo: 'rgb(0,0,0)',
				}}>
					<View style={styles.modalView}>
					<Text style={{
						color:"white",
						fontSize:24,
						marginHorizontal:"20%",
						marginBottom: "10%"
					}}>Songs like {selectedSong ? selectedSong.track_name : queue[selectedTrack].title}</Text>
				<FlatList
					keyExtractor={(item) => item.track_id}
					data={result}
					renderItem={renderer}
					numColumns={1}
					showsVerticalScrollIndicator={false}
				/>
				</View>
			</LinearGradientComp>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		display:"flex",
		flexDirection:"row",
		justifyContent:"center",
		marginVertical:"5%"
	},
	absolute: {
		position: "absolute",
		top: 200,
		left: 0,
		bottom: 0,
		right: 0
  },
	modalView:{
		marginTop:"20%",
		marginBottom:"20%"
	},
	album: {
		width: (width * 5) / 6.5,
		height: (width * 5) / 6.5,
	},
	text: {
		fontSize: 12,
		top: '61%',
		color: 'white',
		fontFamily: 'IBMPlexSans-Regular',
		marginHorizontal: 8,
		marginTop: 6,
	},
});

export default Recommend;