import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet, FlatList} from 'react-native';
import { userData } from '../../constants/store';
import LinearGradientComp from '../Shared/LinearGradient';
import List from "./List"

const FriendsModal = ({modalVisible, toggleVisibility,data}) => {


    const renderer = ({item}) => {
		console.log(item);
        return (
            <List friends={true} item = {item} />
        )
    }
	
	return (
		<Modal
			animationType="fade"
			transparent={false}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>

			<LinearGradientComp
				bgcolors={{
					colorOne: '#7a7adb',
					colorTwo: 'rgba(0, 0, 0, 1)',
				}}>
				<View>
					<View style={styles.modalView}>
                        <FlatList
					        keyExtractor={(item) => (item._id).toString()}
                            data={data}
                            renderItem={renderer}
                            showsVerticalScrollIndicator={false}
				        />
                    </View>       
				</View>
			</LinearGradientComp>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		marginTop: '20%',
		width: '100%',
		height: '90%',
	},
});

export default FriendsModal;
