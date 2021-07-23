import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, FlatList} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import {ACCENT, GRAY, PRIMARY} from '../../constants/colors';
import ImageColors from 'react-native-image-colors';
import PlaylistHero from '../../components/Profile/PlaylistHero';
import SongsList from '../../components/Profile/SongsList';

const {width, height} = Dimensions.get('screen');

const PlaylistScreen = ({route,navigation}) => {

	const [scrollYPosition, setScrollYPosition] = useState(0);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [headerColor, setHeaderColor] = useState('transparent');
	const [headingTint, setHeadingTint] = useState(255);
	const [color, setColor] = useState('');
	const [result, setResult] = useState([]);

    const {item} = route.params;

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
			<SongsList
				navig={navigation}
				item={item}
			/>
		);
	};

	const sampleImage = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"

	useEffect(() => {
		const getDominantColors = async () => {
			try {
				const colors = await ImageColors.getColors(
					item.songs.length === 0 ? sampleImage : item.songs[0].albumArt,
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
				<PlaylistHero
					name={item.name}
					details={item.songs.length === 0 ? sampleImage : item.songs[0].albumArt}
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
                                item._id
							}
							data={item.songs}
							renderItem={renderer}
							showsVerticalScrollIndicator={false}
						/>
					</LinearGradientComp>
				</View>
			</ScrollView>
		</View>
	);
};

export default PlaylistScreen;
