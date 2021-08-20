import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React,{useState} from "react";
import { useContext } from "react";
import { Modal,View,Text,FlatList,StyleSheet,Dimensions } from "react-native";
import { userApiUrl } from "../../constants/config";
import { GlobalContext } from "../../context/GlobalState";
import Button from "../Shared/Button";
import InputBox from "../Shared/InputBox";

const {width, height} = Dimensions.get('window');

const PlayListModal = ({modalVisible,toggleVisibility}) => {

    const {updateUser,user,token} = useContext(GlobalContext);
    const [name,setName] = useState("");

    const handleNameChange = (text) => {
        setName(text)        
    }

    const createPlaylist = () => {
        axios.post(`${userApiUrl}/songs/newPlaylist`,{
            playlistName:name
        },{
            headers: {
				Authorization: "Bearer " + token,
			},
        })
        .then(async (res) => {
            console.log(res.data,"data log");
            updateUser(res.data);
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            toggleVisibility(!modalVisible);
        }).catch((err) => {
            console.log(err,"err");
            // console.log(Array.isArray(err.response.data.errors[0].msg));
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })
    }

    return (
        <Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
			}}>
                <View style={styles.modalView}>
                    <InputBox
                        style={{
                            backgroundColor: "transparent",
                            color: "white",
                            borderLeftWidth:0,
                            fontSize: 16,
                            borderRightWidth:0,
                            borderTopWidth:0,
                            borderWidth: 1,
                        }}
                        label="PlaylistName"
                        value={name}
                        onChangeText={handleNameChange}
                        textContentType={'name'}
                        autoCompleteType={'name'}
                        viewStyle={{marginBottom: 2}}
                    />
                    <View style={{
                        marginLeft:180,
                        marginTop:20
                    }}>
                        <Button title="remove" onPressFunction={createPlaylist}>
                            Create
                        </Button>
                    </View>

                </View>       
		</Modal>
    )
}

const styles = StyleSheet.create({
	modalView: {
        marginHorizontal:(width -300)/2,
        marginTop:height/2.5,
        backgroundColor:"rgba(0, 0, 0, 0.95)",
        width:300,
        height:180,
        paddingVertical:20,
        paddingHorizontal:20,
    },
});

export default PlayListModal;
