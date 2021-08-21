import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet, FlatList} from 'react-native';
import { userData } from '../../constants/store';
import LinearGradientComp from '../Shared/LinearGradient';
import List from "./List"
import FillerImage from "../../../assets/modal.png"
import FillerContent from '../Shared/FillerContent';

const FriendsModal = ({modalVisible, toggleVisibility,data,currentUser}) => {

	const renderer = ({item}) => {
        return (
            <List friends={true} item = {item} currentUser={currentUser._id}/>
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
					{
						data.length > 0 ? (
							<>
								<View style={{
									justifyContent:'center',
									alignItems:"center",
									marginBottom:40
								}}> 
									<Text style={{
										color:"white",
										fontSize:28,
										fontWeight:"bold"
									}}>
										Friends
									</Text>
								</View>

								<FlatList
									keyExtractor={(item) => (item._id).toString()}
									data={data}
									renderItem={renderer}
									showsVerticalScrollIndicator={false}
								/>
							</>
						):(
							<FillerContent fillerImage={FillerImage} text={"No friends yet :/"} />
						)
					}
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
