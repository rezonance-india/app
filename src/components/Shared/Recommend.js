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
							height: '25%',
							top: '75%',
							width: '100%',
							backgroundColor: '#000',
							opacity: 0.65,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}></View>

					<Text
						style={{
							...styles.text,
							fontSize: 15,
							fontFamily: 'NotoSans',
							fontWeight: 'bold',
						}}>
						{item.track_name}
					</Text>
					<Text style={styles.text}>{item.artist_name} </Text>
				</ImageBackground>
			</View>
		);
	};

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
					colorOne: PRIMARY,
					colorTwo: ACCENT,
				}}>
				<FlatList
					keyExtractor={(item) => item.track_id}
					data={result}
					renderItem={renderer}
					numColumns={2}
					showsVerticalScrollIndicator={false}
				/>
			</LinearGradientComp>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 16,
		marginHorizontal: 16,
	},

	album: {
		width: (width * 4) / 10,
		height: (width * 4) / 10,
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
