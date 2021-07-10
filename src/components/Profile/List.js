import React from "react";
import {View,Text,Image,Dimensions} from "react-native";
import Type from "../../components/Shared/Type"
import { colors } from "../../constants/colors";
import Button from "../../components/Shared/Button";

const {width, height} = Dimensions.get('screen');

const List = ({item,friends,pending}) => {

    const removeFriend = () => {
        console.log("remove");
    }

    return (
        <View style={{flexDirection: 'row', width: '100%'}}>

			<View
				style={{
					width: width / 7,
					height: width / 7,
					marginVertical: 7,
					marginHorizontal: 15,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
                {/* <TouchableOpacity onPress = {}> */}
				<Image
					source={{
						uri: "https://images.unsplash.com/photo-1624387832956-1a33ddb5f7f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2735&q=80",
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
						marginTop: 5,
						justifyContent: 'space-between',
						flex:1,
						width: '100%',
					}}>
                        <View style={{
                            flex:1
                        }}>
                            <Type
                                style={{
                                    fontSize: width / 22,
                                    width: '80%',
                                    color: colors.text,
                                    marginTop:-4,
                                    fontFamily:"NotoSans-Bold"
                                }}>
                                {item.name.length > 30
                                    ? `${item.name.substring(0, 20)}....`
                                    : item.name}
                            </Type>
                        </View>
					
                        {
                            pending ? (
                                <View style={{
                                    flexDirection:"row",
                                    flex:1.2,
                                    justifyContent:"space-around"
                                }}>

                                <Button title="accept" onPressFunction={removeFriend}>Accept</Button>
                                <Button backColor="transparent" title="remove" borderColor="white" onPressFunction={removeFriend}>Delete</Button>
                            </View>
                            ):(
                                friends ?
                                (
                                    <Button title="remove" onPressFunction={removeFriend}>Remove</Button>
                                ): (
                                    <>
                                    </>
                                )
                            )
                        }
                            
				</View>

				<Type
					style={{
						fontSize: width / 24,
						color: '#D3D3D3',
                        marginTop:-4,
                        fontFamily:"NotoSans"
					}}>
					{
                            pending ? (
                                "1 friend"
                            ):(
                                friends ?
                                (
                                    "1 friend"
                                ): (
                                    `${item.songs.length} ${item.songs.length> 1 ? "songs" : "song"}`
                                )
                            )
                        }
				</Type>
			</View>
		</View>
    )
}

export default List;