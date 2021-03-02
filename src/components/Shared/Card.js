import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Card = ({heading, image, text, children}) => {
	return (
        <View style={styles.container}>
            <View>

            </View>
        </View>
    )
    
};

const styles = StyleSheet.create({
	container: {
		width: width / 6,
		height: height / 5,
        borderRadius:2
	},
});
export default Card;
