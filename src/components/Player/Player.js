import React, {useState, useRef, useEffect, useContext} from 'react';
import ScreenBuilder from '../../components/Shared/ScreenBuilder';
import {Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, Alert} from 'react-native';
import Video from 'react-native-video';
import ImageColors from 'react-native-image-colors';
import MusicControl, { Command } from 'react-native-music-control'
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

	//Context
	const {updateColor} = useContext(GlobalContext);

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
		// console.log(data.duration,"dur");
		setTotalLength(Math.floor(data.duration));
	};


	// const notif = () => {
		MusicControl.setNowPlaying({
			title:queue[0].title,
			artwork:queue[0].artwork,
			artist:queue[0].artist,
			description:"rezonance",
			color:0xffffff,
			rating: 84,
			duration:totalLength,
			  notificationIcon: 'my_custom_icon', 
		})

	// }


	useEffect(() => {
		MusicControl.on(Command.pause,() => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PAUSED,
			})
			setPaused(true);
		})
	
		MusicControl.on(Command.closeNotification, ()=> {
			console.log("true closed");
		})
		
		MusicControl.on(Command.play,() => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
			})
			setPaused(false);		
		})
		MusicControl.enableBackgroundMode(true);

	},[])

	// useEffect(() => {
    // 	const unsubscribe = props.navig.addListener('focus', () => {
	// 		setPaused(false);
    // 	});

    // 	return unsubscribe;
  	// }, [props.navig]);

	MusicControl.enableControl('previousTrack', true);
	MusicControl.enableControl('play', true);
	MusicControl.enableControl('pause', true);
	MusicControl.enableControl('nextTrack', true);
	// MusicControl.enableControl('stop', true);

	MusicControl.enableControl('changePlaybackPosition', true)

	MusicControl.enableControl('seekForward', true) // iOS only
	MusicControl.enableControl('seekBackward', true); // iOS only
	MusicControl.enableControl('seek', true); // Android only

	MusicControl.enableControl('setRating', false)
	MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
	MusicControl.enableControl('remoteVolume', false)
	MusicControl.enableControl('closeNotification', true, { when: 'always' })


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
		queue.shift();
		updateQueue(queue);
		const persistingData = async () => {
			await AsyncStorage.setItem('queue', JSON.stringify(queue));
		};
		persistingData();
	};

	const track = props.tracks[selectedTrack];

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors(track.artwork, {
				fallback: '#7f8c8d',
			});
			if (colors.platform === 'android') {
				averageColor = colors.average;
				setColor(averageColor);
				updateColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
				updateColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, [track]);

	const video = isChanging ? null : (
		<Video
			source={{uri: track.url}} // Can be a URL or a local file.
			ref={audioElement}
			playInBackground={true}
			playWhenInactive={true}
			paused={paused} // Pauses playback entirely.
			resizeMode="cover" // Fill the whole screen at aspect ratio.
			repeat={repeatOn} // Repeat forever.
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
				album_image={track.artwork}
			/>
			<TouchableOpacity onPress={() => props.navig.navigate("HomeScreen")}>
				<Text style={{
					color:"white",
					fontSize:20
				}}>Test</Text>
			</TouchableOpacity>

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
					MusicControl.updatePlayback({
						state: MusicControl.STATE_PLAYING,
					})		
				}}
				onPressPause={() => {
					setPaused(true);
					MusicControl.updatePlayback({
  						state: MusicControl.STATE_PAUSED,
					})
				}}
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
