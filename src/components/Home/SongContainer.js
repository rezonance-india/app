import axios from 'axios';
import React,{useState,useContext,useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { apiUrl } from '../../constants/config';
import { GlobalContext } from '../../context/GlobalState';
import SongCards from './SongCards';

const {width, height} = Dimensions.get('window');

const SongContainer = ({songtitles,navigation,rfu,trending}) => {
	
	const {queue} = useContext(GlobalContext);
	
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
						queue.map((songs,i) => {
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
