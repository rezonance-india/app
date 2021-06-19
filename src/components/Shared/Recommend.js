import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
	ImageBackground,
	Modal,
	ScrollView,
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
const {width, height} = Dimensions.get('window');
import { BlurView, VibrancyView } from "@react-native-community/blur";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recommend = ({modalVisible, toggleVisibility}) => {
	const [result, setResult] = useState([]);
	const {queue,selectedTrack} = useContext(GlobalContext);

	const renderer = ({item}) => {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={{uri: item.album_image}}
					style={styles.album}
					imageStyle={{borderRadius: 10}}>
        
					<View
						style={{
							height: '27.5%',
							top: '75%',
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
						{item.track_name.length > 20
							? `${item.track_name.substring(0, 20)}...`
							: item.track_name}
					</Text>
					<Text style={{...styles.text, fontSize: 14}}>
						{item.artist_name.length > 30
							? `${item.artist_name.substring(0, 20)}...`
							: item.artist_name}
					</Text>
				</ImageBackground>
			</View>
		);
	};
	// console.log("This should print queue 0", queue[0]);
	useEffect(() => {
		console.log(selectedTrack,"selectedTrack from recommend");
		axios
			.post(
				`${apiUrl}/recommend`,
				{
					ref_id: queue[selectedTrack].id,
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
				console.log(err);
			});
			console.log("in recommend");
	}, [selectedTrack]);

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
					colorOne: 'rgba(44,62,80, 1)',
					colorTwo: 'rgb(0,0,0)',
				}}>
					<View style={styles.modalView}>

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
		marginVertical:"6%"
	},
	absolute: {
		position: "absolute",
		top: 200,
		left: 0,
		bottom: 0,
		right: 0
  },
	modalView:{
		marginTop:"30%",
	},
	album: {
		width: (width * 4) / 6.5,
		height: (width * 4) / 6.5,
	},
	text: {
		fontSize: 12,
		top: '50%',
		color: 'white',
		fontFamily: 'IBMPlexSans-Regular',
		marginHorizontal: 8,
		marginTop: 2,
	},
});

export default Recommend;
