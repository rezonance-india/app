import React from "react";
import {View,Text,Image,TouchableOpacity,ImageBackground,Dimensions,FlatList,StyleSheet} from "react-native"
import LinearGradientComp from "../../components/Shared/LinearGradient";
import { ACCENT, PRIMARY } from "../../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import messageData from "../../constants/messageData";

const {width, height} = Dimensions.get('window');


const MessagingScreen = ({route,navigation}) => {
    const user = route.params.item;

    const handleBack = () => {
        navigation.goBack();
	}

	const renderer = ({item}) => {
		return (
			<View style={item.to === "Kartik" ? {...styles.container,marginLeft:100} : styles.container}>
				<ImageBackground
					source={{uri: item.songDetails.album_image}}
					style={styles.album}
					imageStyle={{borderRadius: 10}}>
					<View
						style={{
							height: '20%',
							top: '80%',
							width: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							// opacity: 0.65,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}></View>

					<Text
						style={{
							...styles.text,
							paddingTop: 8,
							fontSize: 18,
							fontFamily: '',
							fontWeight: 'bold',
						}}>
						{/* {item.songDetails.track_name}  */}
						{item.songDetails.track_name.length > 30
							? `${item.songDetails.track_name.substring(0, 26)}....`
							: item.songDetails.track_name}
					</Text>
					<Text style={styles.text}>{item.songDetails.artist_name} </Text>
				</ImageBackground>
			</View>
		)
	}

    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: 'rgba(0,0,0,1)',
				colorTwo: 'rgba(0,0,0,1)',
			}}>
                
				<View style={{
					marginTop:"10%",
					// marginLeft:"10%",
					marginBottom:20,
					flexDirection:"row",
				}}>


					<TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
						<Icon
							name="arrow-back-outline"
							size={25}
							style={{marginVertical: 10, marginHorizontal:15, color:"white"}}
						/>
					</TouchableOpacity>

					<Image
						source={{
							uri:user.image
						}}
						style={{
							borderRadius: 20,
							width: 50,
							height: 50
						}}
					/>
					<Text style={{
						marginLeft:"4%",
						paddingTop: "1%",
						color:"white",
						marginTop:"2.5%",
						fontFamily:"NotoSans-Bold",
						fontSize:18,
						fontWeight: '700',
					}}>{user.name}</Text>
            	
				</View>            
			
			<FlatList
				keyExtractor={(item) => item.songDetails.track_id}
				data={messageData}
				renderItem={renderer}
				showsVerticalScrollIndicator={false}
			/>

        </LinearGradientComp>
    )
}

const styles = StyleSheet.create({
	container: {
		marginVertical:20,
		marginLeft:20
	},
	album: {
		width: (width * 7) / 10,
		height: (width * 8) / 10,
	},
	text: {
		fontSize: 14,
		top: '60%',
		color: 'white',
		fontFamily: 'IBMPlexSans-Regular',
		marginHorizontal: 8,
		marginTop: 3,
	},
});

export default MessagingScreen;