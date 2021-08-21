import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React,{useState} from "react";
import { useContext } from "react";
import { Modal,View,Text,FlatList,StyleSheet,Dimensions, ToastAndroid } from "react-native";
import { userApiUrl } from "../../constants/config";
import { GlobalContext } from "../../context/GlobalState";
import Button from "../Shared/Button";
import InputBox from "../Shared/InputBox";

const {width, height} = Dimensions.get('window');

const RemoveFriendModal = ({modalVisible,toggleVisibility,id}) => {

    const {updateUser,user,token} = useContext(GlobalContext);
    const [removingText,setRemovingText] = useState(false);

    const removeFriend = () => {
        console.log(id,"in remove");
        setRemovingText(true);
        axios.post(`${userApiUrl}/friends/removeFriend`,
        {
            friendId:id,
        },{
            headers: {
				Authorization: "Bearer " + token,
			},
        })
        .then(async (res) => {
            console.log(res.data,"remove user data");
            updateUser(res.data);
            setRemovingText(false);
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            ToastAndroid.show("Friend Removed", ToastAndroid.SHORT);
        }).catch((err) => {
            setRemovingText(false);
            console.log(err,"err");
            if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
            }
        })     
    }

    const closeModal = () => {
        console.log("lol closed");
        toggleVisibility(!modalVisible);
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
                    <Text style={{
                        color:"black",
                        fontSize:18,
                        marginLeft:15,
                        fontFamily:"NotoSans-Regular"
                    }}>
                        Are you sure you want to remove them as friends?
                    </Text>
                    <View style={{
                        marginLeft:"70%",
                        marginTop:20
                    }}>
                        <View style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            right:100,
                            top:20,
                        }}>
                        <Button title="Yes" onPressFunction={removeFriend}>
                            {removingText ? "..." : "Yes"}
                        </Button>
                        <Button title="No" onPressFunction={closeModal}>
                            No
                        </Button>
                        </View>
                    </View>

                </View>       
		</Modal>
    )
}

const styles = StyleSheet.create({
	modalView: {
        marginHorizontal:(width -300)/2,
        marginTop:height/2.5,
        backgroundColor:"white",
        width:300,
        height:180,
        paddingVertical:20,
        paddingHorizontal:20,
    },
});

export default RemoveFriendModal;
