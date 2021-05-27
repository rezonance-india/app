import React, {useState, useRef, useEffect, useContext} from 'react';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import {Text, View, Image, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import ImageColors from 'react-native-image-colors';

//Colors
import {ACCENT, PRIMARY} from '../../constants/colors';

//Components
import Controls from '../../components/Player/Controls';
import SeekBar from '../../components/Player/SeekBar';
import TrackDetails from '../../components/Player/TrackDetails';
import LinearGradientComp from '../Shared/LinearGradient';
import {GlobalContext} from '../../context/GlobalState';

const Player = (props) => {
	// const {album_image, artist_name, track_name} = props.route.params;

	const [paused, setPaused] = useState(true);
	const [totalLength, setTotalLength] = useState(1);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [selectedTrack, setSelectedTrack] = useState(0);
	const [repeatOn, setRepeatOn] = useState(false);
	const [shuffleOn, setShuffleOn] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const [color, setColor] = useState('');
	const [liked, setLiked] = useState(false);
	const {queue, updateQueue} = useContext(GlobalContext);
	const audioElement = useRef(null);

	const setDuration = (data) => {
		setTotalLength(Math.floor(data.duration));
	};

	const setTime = (data) => {
		setCurrentPosition(Math.floor(data.currentTime));
	};

	const seek = (time) => {
		time = Math.round(time);
		audioElement.current && audioElement.current.seek(time);
		setCurrentPosition(time);
		setPaused(false);
	};

	const onBack = () => {
		if (currentPosition < 10 && selectedTrack > 0) {
			audioElement.current && audioElement.current.seek(0);
			setIsChanging(true);

			setTimeout(() => {
				setCurrentPosition(0);
				setPaused(false);
				setTotalLength(1);
				setIsChanging(false);
				setSelectedTrack((track) => track - 1);
			}, 0);
		} else {
			audioElement.current.seek(0);
			setCurrentPosition(0);
		}
	};

	const onForward = () => {
		if (selectedTrack < props.tracks.length - 1) {
			audioElement.current && audioElement.current.seek(0);
			setIsChanging(true);
			setTimeout(() => {
				setCurrentPosition(0);
				setPaused(false);
				setTotalLength(1);
				setIsChanging(false);
				setSelectedTrack((track) => track + 1);
			}, 0);
		}
	};

	const videoError = (data) => {
		console.log(data, 'error');
	};

	const popSongFromQueue = () => {
		const newQueue = queue.shift();
		updateQueue(queue);
	};

	const track = props.tracks[selectedTrack];

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors(track.albumArtUrl, {
				fallback: '#7f8c8d',
			});
			if (colors.platform === 'android') {
				averageColor = colors.average;
				setColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, [track]);

	const video = isChanging ? null : (
		<Video
			source={{uri: track.audioUrl}} // Can be a URL or a local file.
			ref={audioElement}
			playInBackground={true}
			playWhenInactive={true}
			paused={paused} // Pauses playback entirely.
			resizeMode="cover" // Fill the whole screen at aspect ratio.
			repeat={false} // Repeat forever.
			onLoad={setDuration} // Callback when video loads
			onProgress={setTime} // Callback every ~250ms with currentTime
			// onEnd={onEnd} // Callback when playback finishes
			onError={videoError} // Callback when video cannot be loaded
			style={styles.audioElement}
			onEnd={popSongFromQueue}
		/>
	);

	return (
		<LinearGradientComp
			bgcolors={{
				colorOne: color ? color : '#7f8c8d',
				colorTwo: ACCENT,
			}}>
			<TrackDetails
				track_name={track.title}
				artist_name={track.artist}
				album_image={track.albumArtUrl}
			/>
			<SeekBar
				onSeek={seek}
				trackLength={totalLength}
				onSlidingStart={() => setPaused(true)}
				currentPosition={currentPosition}
			/>
			<Controls
				onPressLike={() => setLiked((liked) => !liked)}
				liked={liked}
				onPressRepeat={() => setRepeatOn((repeatOn) => !repeatOn)}
				repeatOn={repeatOn}
				shuffleOn={shuffleOn}
				backwardDisabled={selectedTrack === 0}
				forwardDisabled={selectedTrack === props.tracks.length - 1}
				onPressShuffle={() => setShuffleOn((shuffleOn) => !shuffleOn)}
				onPressPlay={() => {
					setPaused(false);
				}}
				onPressPause={() => setPaused(true)}
				onBack={onBack}
				onForward={onForward}
				paused={paused}
			/>
			{video}
		</LinearGradientComp>
	);
};

const styles = StyleSheet.create({
	audioElement: {
		height: 0,
		width: 0,
	},
});
export default Player;
