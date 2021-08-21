import React, {useState} from 'react';
import {FlatList,StyleSheet,Dimensions, Text, View, Image} from 'react-native';

import Search from "../../../assets/search.png"

const {width, height} = Dimensions.get('screen');

const FillerContent = ({text,extraStyles,fillerImage}) => {
    return (
        <View style={styles.styleView}>
            <Image
                    source={fillerImage ? fillerImage : Search}
                    style={{
                        height:height/4,
                        width: width/2,
                        marginBottom: 30,
                        marginRight:fillerImage ? 0 : width/10,
                        marginTop:height/7
                    }}
                />
            <Text style={{
                ...styles.text
            }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	styleView:{
        display:'flex',
		justifyContent:'center',
		alignItems:'center',
	},
	text:{
		fontFamily:"NotoSans-Regular",
		fontSize:28,
		color:"white",
	}
})

export default FillerContent;