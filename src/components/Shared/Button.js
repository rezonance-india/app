import React from "react"
import {View,Text,StyleSheet, TouchableOpacity} from "react-native";

const Button = ({children,backColor,onPressFunction,borderColor,buttonStyle,textStyles}) => {
    return (
		<TouchableOpacity onPress={onPressFunction}>
			<View style={{
				...styles.button,
				...buttonStyle,
				backgroundColor: backColor ? backColor: '#09a0eb',
				borderColor: borderColor ? borderColor : "transparent"
			}}>
				<Text style={{
					...styles.textButton,
					...textStyles
				}}>
					{children}
				</Text>
			</View>
		</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	button: {
		height: 35,
		width: 70,
		borderRadius: 4,
        borderWidth:1,
        left:"10%",
		paddingVertical: 5,
		alignContent: 'center',
		textAlignVertical: 'center',
	},
	textButton: {
		textAlign: 'center',
		marginTop: '3%',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});


export default Button;