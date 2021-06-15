import React, {useContext} from 'react';
import NewPlayer from '../../components/Player/NewPlayer';
import Player from '../../components/Player/Player';
import {TRACKS} from '../../components/Player/tracksData';
import {GlobalContext} from '../../context/GlobalState';

const PlayerScreen = ({navigation}) => {
	const {queue} = useContext(GlobalContext);
	return <Player tracks={queue} navig={navigation}/>;
};

export default PlayerScreen;
