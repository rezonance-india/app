import React, {useContext} from 'react';
import NewPlayer from '../../components/Player/NewPlayer';
import {TRACKS} from '../../components/Player/tracksData';
import {GlobalContext} from '../../context/GlobalState';

const PlayerScreen = ({route,navigation}) => {
	const {queue} = useContext(GlobalContext);
	return <NewPlayer tracks={queue} navig={navigation}/>;
};

export default PlayerScreen;
