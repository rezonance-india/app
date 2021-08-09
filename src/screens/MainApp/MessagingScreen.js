import React,{useContext} from "react";
import {View,Text,Image,TouchableOpacity,ImageBackground,Dimensions,FlatList,StyleSheet} from "react-native"
import LinearGradientComp from "../../components/Shared/LinearGradient";
import { ACCENT, PRIMARY } from "../../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from "../../context/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get('window');

const MessagingScreen = ({route,navigation}) => {
	const item = route.params.item;
    const {chat} = route.params.item;
	const {user,queue,selectedTrack,updateQueue} = useContext(GlobalContext);

	console.log(chat,"chat");

    const handleBack = () => {
        navigation.goBack();
	}

	const renderer = ({item}) => {
		
		const playSong = () => {
			const trackDetails = queue;

			const {message} = item;

			trackDetails[selectedTrack] = {
				title: message.trackName,
				artist: message.artistName,
				artwork: message.albumArt,
				url:message.trackUrl,
				id: message.track_id,
			};

			updateQueue(trackDetails);

			const persistingData = async () => {
				await AsyncStorage.setItem(
					'queue',
					JSON.stringify(trackDetails),
				);
			};

			persistingData();

			navigation.navigate("PlayerScreen");		
		}

		return (
			<View style={item.user._id === user._id ? {...styles.container,marginLeft:100} : styles.container}>
				<TouchableOpacity onPress={playSong}>

					<ImageBackground
						source={{uri: item.message.albumArt}}
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
							{item.message.trackName.length > 30
								? `${item.message.trackName.substring(0, 26)}....`
								: item.message.trackName}
						</Text>
						<Text style={styles.text}>{item.message.artistName} </Text>
					</ImageBackground>
				</TouchableOpacity>
			</View>
		)
	}

	const sampleImage = "https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80"

    return (
        <LinearGradientComp
			bgcolors={{
				colorOne: PRIMARY,
				colorTwo: ACCENT,
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
							uri:sampleImage
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
					}}>
						{item.to._id !== user._id ? 
							item.to.name.length > 30
							? item.to.name.substring(0, 30) +
							'...'
							: item.to.name
							: 
							(
							item.user.name.length > 30
							? item.user.name.substring(0, 30) +
							'...'
							: item.user.name
							)
						}
					</Text>
            	
				</View>            
			
			<FlatList
				keyExtractor={(item) => item._id}
				data={chat}
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