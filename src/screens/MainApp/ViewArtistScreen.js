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
} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import {ACCENT, GRAY, PRIMARY} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistHero from '../../components/ViewArtist/ArtistHero';
import ImageColors from 'react-native-image-colors';

const {width, height} = Dimensions.get('screen');

const ViewArtistScreen = ({route}) => {
	const {artist_image, artist_name} = route.params;

	const details = {
		artist_image,
		artist_name,
	};

	const [scrollYPosition, setScrollYPosition] = useState(0);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [headerColor, setHeaderColor] = useState('transparent');
	const [headingTint, setHeadingTint] = useState(255);
	const [color, setColor] = useState('');

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

	console.log('color', color);

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors(details.artist_image, {
				fallback: '#7f8c8d',
			});
			if (colors.platform === 'android') {
				averageColor = colors.average;
				setColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, []);

	return (
		<ScrollView onScroll={handleOnScroll} stickyHeaderIndices={[1]}>
			<ArtistHero
				details={details}
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
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 500,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 500,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 500,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
					<Text
						style={{
							top: 100,
							color: 'white',
						}}>
						View Artist
					</Text>
				</LinearGradientComp>
			</View>
		</ScrollView>
	);
};

export default ViewArtistScreen;
