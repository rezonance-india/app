import React, {useState,useContext} from 'react';
import {FlatList, View, Image,Text, Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import {apiUrl, userApiUrl} from '../../constants/config';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBox from '../../components/Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';
import {colors} from '../../constants/colors';
import Type from '../Shared/Type';
import { GlobalContext } from '../../context/GlobalState';
import FillerContent from '../Shared/FillerContent';
import MiniPlayer from '../Shared/MiniPlayer';

const {width, height} = Dimensions.get('screen');

const FriendSearch = ({navigation}) => {
	const [result, setResult] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [filler,setFiller] = useState(true);
 
	const {user,token,queue} = useContext(GlobalContext); 

	const renderer = ({item}) => {
		return (
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => {
					if(item._id === user._id) {
						navigation.navigate("ProfileScreen",{
							item
						}) 
					}
					else{
						navigation.navigate("ViewProfileScreen",{
							item
						})
					}
				}}>
				<View style={{flexDirection: 'row', width: '100%'}}>
					<View
						style={{
							width: width / 7,
							height: width / 7,
							borderRadius: 1,
							marginVertical: 7,
							marginHorizontal: 10,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Image
							source={{
								uri:item.photo 
							}}
							style={{
								width: 50,
								height: 50,
								borderRadius: 6,
								overflow: 'hidden',
							}}
						/>
					</View>

					<View
						style={{
							marginVertical: 10,
							marginHorizontal: 15,
							justifyContent: 'space-around',
							flex: 1,
						}}>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 1,
								justifyContent: 'space-between',
								flex: 1,
								width: '100%',
							}}>
							<Type
								style={{
									fontSize: width / 24,
									width: '80%',
									color: colors.text,
									fontFamily:"NotoSans-Bold",
								}}>
								{item.username.length > 30
									? `${item.username.substring(0, 20)}....`
									: item.username}
							</Type>
						</View>

						<Type
							style={{
								fontSize: width / 26,
								color: '#D3D3D3',
								fontFamily:"NotoSans-Regular"
							}}>
							{`${item.friends.length} friends`}
						</Type>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const search = _.debounce((value) => {
		console.log(value, 'value');
		if (value.length === 0) {
			setResult([]);
			setFiller(true);
		}
		if (value.length !== 0) {
			setFiller(false);
			axios
				.post(
					`${userApiUrl}/friends/getAllUsers`,
					{
						name: value,
					},
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					},
				)
				.then((res) => {
                    console.log(res.data,"data");
					setResult(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, 500);

	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: "rgb(15, 15, 15)",
				colorTwo: "rgb(15, 15, 15)",
			}}>
			<View
				style={{
					marginTop: 20,
				}}>
				<SearchBox
					placeholder="Search Your Future Friends"
					searchQuery={searchQuery}
					setSearchQuery={search}
					navigation={navigation}
				/>
			</View>
			{
				result.length === 0 && !filler ? (		
					<FillerContent text = {"No Search Results"} />
				):(
					filler ? (
						<>
							<FillerContent text = {"Nothing Searched"} />
						</>
					):(
						<>
							<FlatList
								keyExtractor={(item) => item._id}
								data={result}
								renderItem={renderer}
								showsVerticalScrollIndicator={false}
							/>
						</>
					)
				)
			}
			<View style={{
				marginTop:height/7
			}}>
				{queue && queue.length > 0 ? <MiniPlayer nav={navigation} /> : null}
			</View>
		</LinearGradientComp>
	);
};

export default FriendSearch;

