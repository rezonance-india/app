import React, {useState,useContext} from 'react';
import {Modal, Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {userData} from '../../constants/store';
import { GlobalContext } from '../../context/GlobalState';
import SearchBox from '../Search/SearchBox';
import LinearGradientComp from '../Shared/LinearGradient';

const AddToPlayListModal = ({modalVisible, toggleVisibility}) => {
    const {user} = useContext(GlobalContext);
    
    let playlistNames = [];

    //Saving the playlist names
    user.playlists.map((playlist) => {
        playlistNames.push(playlist.name);
    })

    console.log(playlistNames,"name");

    const [searchQuery, setSearchQuery] = useState('');
	const [searchResults,setSearchResults] = useState(playlistNames);

    const search = (value) => {
        //Searching using regex
        let re = new RegExp(`^${value}`);

        let results = [];

        playlistNames.map((playlist) => {
            if(playlist.match(re)){
                results.push(playlist);
                setSearchResults(results);
            }
            else{
                setSearchResults([]);
            }
        })
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
			<LinearGradientComp
				bgcolors={{
					colorOne: 'rgba(0, 0, 0, 0.3)',
					colorTwo: 'rgba(0, 0, 0, 1)',
				}}>
				<View>
					<View style={styles.modalView}>
						<SearchBox
							placeholder="Search Playlists"
							searchQuery={searchQuery}
							setSearchQuery={search}
						/>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{
								color: 'white',
							}}>
							{searchResults && searchResults.map((playlist, i) => (
                                    <View
                                        key={i}
                                        style={{
                                            flexDirection: 'column',
                                            alignContent: 'space-between',
                                            margin: '2%',
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                            }}>
                                            <Image
                                                source={{uri: "https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43"}}
                                                style={{
                                                    left: 10,
                                                    width: 50,
                                                    height: 50,
                                                }}
                                            />
                                            <Text style={styles.options}>
                                                {playlist}
                                            </Text>
                                            
                                        </View>
                                    </View>
                                )        
                            )}
						</ScrollView>
					</View>
				</View>
			</LinearGradientComp>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		marginTop: '100%',
		width: '100%',
		height: '50%',
	},
	options: {
		color: 'white',
		left: 70,
		fontWeight: 'bold',
		fontFamily: 'Open Sans',
		fontSize: 16,
		marginTop: 7.5,
		marginLeft: -10,
	},
	button: {
		backgroundColor: '#09a0eb',
		// backgroundColor: '#7200ca',
		height: 35,
		width: 70,
		opacity: 0.8,
		borderRadius: 5,
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

export default AddToPlayListModal;
