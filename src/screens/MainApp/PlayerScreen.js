import React from 'react';
import Player from '../../components/Player/Player';
import {TRACKS} from '../../components/Player/tracksData';

const PlayerScreen = () => {
	return <Player tracks={TRACKS} />;
};

export default PlayerScreen;
