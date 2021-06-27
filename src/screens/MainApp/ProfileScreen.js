import React,{useEffect,useState} from 'react';
import {Text,View,Image,StyleSheet,FlatList,Dimensions,ScrollView} from 'react-native';
import LinearGradientComp from '../../components/Shared/LinearGradient';
import { ACCENT, colors } from '../../constants/colors';
import ImageColors from 'react-native-image-colors';
import { playlistData } from '../../constants/Playlistdata';
import List from "../../components/Profile/List"
import { userData } from '../../constants/store';
import Icon from 'react-native-vector-icons/Ionicons';
import Type from "../../components/Shared/Type"

const {width, height} = Dimensions.get('screen');

const ProfileScreen = ({route}) => {
	const [color,setColor] = useState(color);
	
	const {imageUrl} = route.params;

	const renderer = ({item}) => {
		return(
			<List item = {item} /> 
		)
	}

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
			<ScrollView>

				<View style={{
					flexDirection:"row",
					marginTop:30
				}}>
					<Icon
						name="create-outline"
						size={50}
						style={{marginHorizontal:20, color:"white"}}
					/>

					<View
						style={{
							flexDirection: 'row',
							marginTop:10,
							justifyContent: 'space-between',
							flex: 1,
							width: '100%',
					}}>
						<Type
							style={{
								fontSize: width / 22,
								width: '80%',
								color: colors.text,
								marginHorizontal:10,
								fontWeight:"bold",
								fontFamily:"IBMPlexSans"
							}}>
							{"Create Playlist"}
						</Type>
					</View>

				</View>	 	
				
				<FlatList
					keyExtractor={(item) => (item.id).toString()}
					data={playlistData}
					renderItem={renderer}
					showsVerticalScrollIndicator={false}
				/>
			</ScrollView>
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
