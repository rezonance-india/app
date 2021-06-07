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

const {width, height} = Dimensions.get('screen');

const ArtistHero = ({
	details,
	yOffset,
	onParallaxImageScrolled,
	headingTint,
	setHeadingTint,
}) => {
	const HEIGHT_FACTOR = 3;
	const [parallaxMultiplier, setParallaxMultiplier] = useState(1);
	const [parallaxOpacity, setParallaxOpacity] = useState(1);
	const [statusColor, setStatusColor] = useState('#0005');
	const [statusStyle, setStatusStyle] = useState('light-content');
	const [enlargeImage, setEnlargeImage] = useState(false);
	const [isReadMore, setIsReadMore] = useState(true);

	useEffect(() => {
		setParallaxMultiplier(yOffset != 0 ? 0.01 * yOffset + 1 : 1);
		setParallaxOpacity(
			1 - yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier) - 30),
		);
		if (yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier)) < 1) {
			setHeadingTint(
				255 *
					(1 -
						yOffset /
							(height / (HEIGHT_FACTOR * parallaxMultiplier))),
			);
		}

		if (yOffset + 30 > height / (HEIGHT_FACTOR * parallaxMultiplier)) {
			setStatusColor(GRAY.T2);
			setStatusStyle('dark-content');
			if (onParallaxImageScrolled) {
				onParallaxImageScrolled(true);
			}
		} else {
			setStatusColor('#0005');
			setStatusStyle('light-content');
			if (onParallaxImageScrolled) {
				onParallaxImageScrolled(false);
			}
		}
	}, [yOffset]);

	return (
		<>
			<StatusBar
				translucent={true}
				backgroundColor={statusColor}
				barStyle={statusStyle}
			/>

			<Modal
				visible={enlargeImage}
				animationType="fade"
				transparent
				statusBarTranslucent={true}
				onRequestClose={() => setEnlargeImage(false)}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						setEnlargeImage(false);
					}}>
					<View style={{backgroundColor: '#000'}}>
						<Image
							source={{uri: details.artist_image}}
							style={{
								width,
								height,
							}}
							resizeMode="contain"
						/>
					</View>
				</TouchableOpacity>
			</Modal>

			<ScrollView>
				<TouchableOpacity
					activeOpacity={0.75}
					onPress={() => setEnlargeImage(true)}>
					<Image
						source={{uri: details.artist_image}}
						style={{
							width,
							height:
								height / (HEIGHT_FACTOR * parallaxMultiplier) +
								50,

							opacity: parallaxOpacity,
						}}
						resizeMode="cover"
						resizeMethod="resize"
					/>
				</TouchableOpacity>
				<View
					style={{
						position: 'absolute',
						top: height / (2 * HEIGHT_FACTOR),
						opacity: parallaxOpacity,
					}}>
					<View style={{width}}>
						<Text
							style={{
								fontSize: width / 13,
								color: 'white',
								textShadowColor: 'black',
								textShadowRadius: 30,
								textAlign: 'center',
							}}
							viewStyle={{margin: 10}}>
							{details.artis_name}
						</Text>
					</View>
				</View>
			</ScrollView>
		</>
	);
};

export default ArtistHero;
