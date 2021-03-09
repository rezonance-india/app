import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import SongCards from './SongCards';

const {width, height} = Dimensions.get('window');

const SongContainer = ({songtitles, rp, rfu, trending, navigation}) => {
	const renderItems = () => {
		if (rp) {
			return rp.map((songs, i) => {
				return (
					<SongCards navigation={navigation} item={songs} key={i} />
				);
			});
		}
		if (rfu) {
			return rfu.map((songs) => {
				return <SongCards item={songs} key={i} />;
			});
		}
		if (trending)
			return trending.map((songs, i) => {
				return <SongCards item={songs} key={i} />;
			});
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{songtitles}</Text>
				<ScrollView horizontal>{renderItems()}</ScrollView>
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
