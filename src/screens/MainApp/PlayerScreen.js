import React, {useContext} from 'react';
import Player from '../../components/Player/Player';
import {TRACKS} from '../../components/Player/tracksData';
import {GlobalContext} from '../../context/GlobalState';

const PlayerScreen = () => {
	const {queue} = useContext(GlobalContext);
	return <Player tracks={queue} />;
};

export default PlayerScreen;
