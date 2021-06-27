import React from "react";
import {View,Text,Image,Dimensions} from "react-native";
import Type from "../../components/Shared/Type"
import { colors } from "../../constants/colors";

const {width, height} = Dimensions.get('screen');

const List = ({item}) => {
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
						uri: item.image,
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
						flex: 1,
						width: '100%',
					}}>
					<Type
						style={{
							fontSize: width / 22,
							width: '80%',
							color: colors.text,
                            fontFamily:"NotoSans-Bold"
						}}>
						{item.name.length > 30
							? `${item.name.substring(0, 20)}....`
							: item.name}
					</Type>
					
				</View>

				<Type
					style={{
						fontSize: width / 26,
						color: '#D3D3D3',
                        fontFamily:"NotoSans"
					}}>
					{"Kartik Goel"}
				</Type>
			</View>
		</View>
    )
}

export default List;