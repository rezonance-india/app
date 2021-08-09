import axios from 'axios';
import React,{useState,useContext,useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { apiUrl } from '../../constants/config';
import { GlobalContext } from '../../context/GlobalState';
import SongCards from './SongCards';

const {width, height} = Dimensions.get('window');

const SongContainer = ({songtitles,navigation}) => {
	
	const [rp,setRp] = useState([]);
	const [rfu,setRfu] = useState([]);
	const [trending,setTrending] = useState([]); 

	const {queue} = useContext(GlobalContext);

	useEffect(() => {
		
		let rpArray = [];
		
		queue.map((song,i) => {
			rpArray.push(song);
		})
	
		setRp(rpArray);

		axios
		.get(
			`${apiUrl}trending/tracks`
		)
		.then((res) => {
			const result = res.data;
			
			const trendingName= [];
			const rfuName= [];

			for(let i=0,j=5;i<5,j<10;i++,j++){
				trendingName[i] = result[i];
				rfuName[j-5] = result[j];
			}

			setTrending(trendingName);
			setRfu(rfuName);

		}).catch((err) => {
			console.log(err);
		})
	},[])
	
	const renderItems = (songtitle) => {
	
		return (
			songtitle === "Trending" ? 
			(
				trending.map((songs,i) => {
					return <SongCards navigation = {navigation} item={songs} key={i} />;
				})
			): (
				songtitle === "Recommended For You" ? (
					rfu.map((songs,i) => {
						return <SongCards navigation = {navigation} item={songs} key={i} />;
					})	
				) :(
					songtitle === "Recently Played" ? (
						rp.map((songs,i) => {
							return <SongCards navigation = {navigation} rp={true} item={songs} key={i} />;
						})	
					):(
						<>
						</>
					)	
				)
			)
			
		)
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{songtitles}</Text>
				<ScrollView horizontal>{renderItems(songtitles)}</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: width / 50,
		paddingBottom: height / 50,
	},

	title: {
		marginLeft: 7,
		color: 'white',
		fontSize: 16,
		fontFamily: 'sans-serif',
		fontWeight: '700',
		marginBottom: 8,
	},
});

export default SongContainer;
