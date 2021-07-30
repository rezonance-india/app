import React, {useContext} from 'react';
import Player from '../../components/Player/Player';
import {GlobalContext} from '../../context/GlobalState';

const PlayerScreen = ({route,navigation}) => {
	const {queue} = useContext(GlobalContext);
	return (
		<Player tracks={queue} navig={navigation}/>
	);
};

export default PlayerScreen;
