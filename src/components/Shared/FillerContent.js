import React, {useState} from 'react';
import {FlatList,StyleSheet,Dimensions, Text, View, Image} from 'react-native';

import Search from "../../../assets/search.png"

const {width, height} = Dimensions.get('screen');

const FillerContent = ({text,extraStyles}) => {
    return (
        <View style={styles.styleView}>
            <Image
                    source={Search}
                    style={{
                        height:height/4,
                        width: width/2,
                        marginBottom: 30,
                        marginLeft:width/6,
                        marginTop:height/7
                    }}
                />
            <Text style={{
                ...styles.text,
		        marginLeft:extraStyles ? width/6 : width/4,
            }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	styleView:{
		justifyContent:'center',
		alignContent:'center',
	},
	text:{
		fontWeight:"bold",
		fontSize:28,
		color:"white",
	}
})

export default FillerContent;