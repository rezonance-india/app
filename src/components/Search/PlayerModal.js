import React,{useContext} from "react";
import {Text,Modal} from "react-native"
import Player from "../Player/Player";
import {GlobalContext} from '../../context/GlobalState';

const PlayerModal = ({modalVisible,toggleVisibility}) => {
    const {queue} = useContext(GlobalContext);
    return (
        <Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				toggleVisibility(!modalVisible);
		}}>
           <Player tracks={queue}/>
        </Modal>
    )
}

export default PlayerModal;