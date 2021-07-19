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

    console.log(item,"data");

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

	useEffect(() => {
		const getDominantColors = async () => {
			try {
				const colors = await ImageColors.getColors(
					"https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43",
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
					details={"https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43"}
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
