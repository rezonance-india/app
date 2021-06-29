import React from "react"
import {View,Text,StyleSheet} from "react-native";

const Button = ({children,backColor,onPress,borderColor}) => {
    return (
        <View style={{
            ...styles.button,
            backgroundColor: backColor ? backColor: '#09a0eb',
            borderColor: borderColor ? borderColor : "transparent"
        }}>
            <Text style={styles.textButton}>
                {children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
	button: {
		height: 35,
		width: 70,
		borderRadius: 5,
        borderWidth:1,
        marginLeft:3,
		paddingVertical: 7.5,
		alignContent: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	textButton: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});


export default Button;