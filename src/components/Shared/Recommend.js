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

const Recommend = ({modalVisible, toggleVisibility}) => {
	const [result, setResult] = useState([]);
	const {queue} = useContext(GlobalContext);

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
							fontSize: 20,
							fontFamily: 'NotoSans',
							fontWeight: 'bold',
						}}>
						{item.track_name}
					</Text>
					<Text style={{...styles.text, fontSize: 14}}>{item.artist_name} </Text>
				</ImageBackground>
			</View>
		);
	};
	// console.log("This should print queue 0", queue[0]);
	useEffect(() => {
		axios
			.post(
				`${apiUrl}/recommend`,
				{
					ref_id: queue[0].ref_id,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				console.log(res.data, 'data');
				setResult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
					colorOne: "rgba(44,62,80, 1)",
					colorTwo: "rgb(0,0,0)",
				}}>
				<FlatList
					keyExtractor={(item) => item.track_id}
					data={result}
					renderItem={renderer}
					numColumns={1}
					showsVerticalScrollIndicator={false}
				/>
			</LinearGradientComp>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: '7.5%',
		marginHorizontal: '19.5%',
	},

	album: {
		width: (width * 4) / 6.5,
		height: (width * 4) / 6.5,
	},
	text: {
		fontSize: 12,
		top: '52%',
		color: 'white',
		fontFamily: 'NotoSans-Regular',
		marginHorizontal: 8,
		marginTop: 2,
	},
});

export default Recommend;
