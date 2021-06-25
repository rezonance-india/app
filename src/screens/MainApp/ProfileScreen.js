import React,{useEffect,useState} from 'react';
import {Text,View,Image,StyleSheet} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import { ACCENT } from '../../constants/colors';
import ImageColors from 'react-native-image-colors';

const ProfileScreen = ({route}) => {
	const [color,setColor] = useState(color);

	const {imageUrl} = route.params;

	useEffect(() => {
		const getDominantColors = async () => {
			
			const colors = await ImageColors.getColors(imageUrl, {
				fallback: '#7f8c8d',
			});

			if (colors.platform === 'android') {
				const {lightVibrant,average} = colors;

				if(lightVibrant === "#000000"){
					averageColor = average;
				}
				else {
					averageColor = lightVibrant;
				}
				setColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, [imageUrl]);

    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: color ? color : '#7f8c8d',
				colorTwo: ACCENT,
			}}>
			
			<View style={{
				flexDirection:"column",
				justifyContent:"space-between",
				alignItems:"center",
				marginTop:"30%"
			}}>
				<Image
					source={{uri: imageUrl}}
					style={{
						borderRadius: 70,
						width: 140,
						height: 140,
				}} />
				<Text style={styles.text}>
					kg-kartik
				</Text>
			</View>
			<View style={{
				flexDirection:"column",
			}}>
				<View style={{
					flexDirection:"row",
					justifyContent:"space-around",
					marginTop:20,
				}}>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						0
					</Text>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						0
					</Text>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						0
					</Text>
				</View>

				<View style={{
					flexDirection:"row",
					justifyContent:"space-around",
					fontSize:20,
					marginTop:-15,
				}}>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						Followers
					</Text>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						Following
					</Text>
					<Text style={{
						...styles.text,
						fontFamily:"NotoSans-Regular",
						fontSize:20
					}}>
						Playlist
					</Text>
				</View>
			</View>
		</LinearGradientComp>
    )
};

const styles = StyleSheet.create({
	text:{
		fontSize:24,
		color:"white",
		marginTop:"4%",
		fontFamily:"NotoSans-Bold"
	}
})

export default ProfileScreen;
