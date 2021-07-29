import React, {useContext} from 'react';
import NewPlayer from '../../components/Player/NewPlayer';
import Player from '../../components/Player/Player';
import {TRACKS} from '../../components/Player/tracksData';
import {GlobalContext} from '../../context/GlobalState';

const PlayerScreen = ({route,navigation}) => {
	const {queue} = useContext(GlobalContext);
	// return <NewPlayer tracks={queue} navig={navigation}/>;
	return <Player tracks={queue} navig={navigation}/>;
	// return (
	// 	<Player pass={route.params.songDetails} navig={navigation}/>
	// )
};

export default PlayerScreen;
