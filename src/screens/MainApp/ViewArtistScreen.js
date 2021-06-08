import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	Image,
	Modal,
	Dimensions,
	StatusBar,
	Platform,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import {ACCENT, GRAY, PRIMARY} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistHero from '../../components/ViewArtist/ArtistHero';
import ImageColors from 'react-native-image-colors';
import axios from 'axios';
import {apiUrl} from '../../constants/config';
import SimpleList from '../../components/Shared/SimpleList';

const {width, height} = Dimensions.get('screen');

//Two components rendering
//Artist Search -> Hero image of Artist
//List -> Album images with album names and the artist name below it

//Second -
//Album Search -> View Artist Screen but with Album image as the hero image
//List -> All tracks of that album
const ViewArtistScreen = ({route}) => {
	const {
		artist_image,
		artist_name,
		artist_id,
		album_image,
		album_name,
		album_id,
		tracksData,
		albumData,
	} = route.params;

	const album_details = {
		tracksData,
		album_image,
		album_name,
		album_id,
	};

	const artist_details = {
		albumData,
		artist_id,
		artist_image,
		artist_name,
	};

	const [scrollYPosition, setScrollYPosition] = useState(0);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [headerColor, setHeaderColor] = useState('transparent');
	const [headingTint, setHeadingTint] = useState(255);
	const [color, setColor] = useState('');
	const [result, setResult] = useState([]);

	const handleOnScroll = (event) => {
		if (event.nativeEvent.contentOffset.y < height / 2) {
			setScrollYPosition(event.nativeEvent.contentOffset.y);
		}
	};

	const handleParallaxImageScrolled = (scrolled) => {
		if (scrolled) {
			setHasScrolled(true);
			setHeaderColor(GRAY.T2);
			setHeadingTint(0);
		} else {
			setHasScrolled(false);
			setHeaderColor('transparent');
		}
	};

	//List renderer function
	const renderer = ({item}) => {
		return (
			<SimpleList
				artist_details={album_details.tracksData ? false : true}
				item={item}
			/>
		);
	};

	useEffect(() => {
		const getDominantColors = async () => {
			try {
				const colors = await ImageColors.getColors(
					artist_details.artist_image,
					{
						fallback: '#7f8c8d',
					},
				);
				if (colors.platform === 'android') {
					averageColor = colors.average;
					setColor(averageColor);
				} else {
					const backgroundColor = colors.background;
					setColor(backgroundColor);
				}
				return averageColor;
			} catch (e) {
				console.log(e, 'error');
			}
		};
		getDominantColors();
	}, []);

	return (
		<View>
			<ScrollView onScroll={handleOnScroll} stickyHeaderIndices={[1]}>
				<ArtistHero
					name={
						album_details.tracksData
							? album_details.album_name
							: artist_details.artist_name
					}
					details={
						album_details.tracksData
							? album_details.album_image
							: artist_details.artist_image
					}
					yOffset={scrollYPosition}
					onParallaxImageScrolled={handleParallaxImageScrolled}
					headingTint={headingTint}
					setHeadingTint={setHeadingTint}
				/>

				<View
					style={{
						position: 'absolute',
						width,
						backgroundColor: headerColor,
					}}></View>
				<View
					style={{
						flex: 1,
						height,
					}}>
					<LinearGradientComp
						bgcolors={{
							colorOne: color ? color : '#7f8c8d',
							colorTwo: ACCENT,
						}}>
						<FlatList
							keyExtractor={(item) =>
								album_details.tracksData
									? item.ref_id
									: item.album_id
							}
							data={
								album_details.tracksData
									? album_details.tracksData
									: artist_details.albumData
							}
							renderItem={renderer}
							showsVerticalScrollIndicator={false}
						/>
					</LinearGradientComp>
				</View>
			</ScrollView>
		</View>
	);
};

export default ViewArtistScreen;
