import React, {useState, useRef, useEffect, useContext} from 'react';
import {Text, View, Image, StyleSheet, BackHandler, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import ImageColors from 'react-native-image-colors';
import MusicControl, { Command } from 'react-native-music-control'

//Colors
import {ACCENT, PRIMARY} from '../../constants/colors';

//Components
import Controls from '../../components/Player/Controls';
import SeekBar from '../../components/Player/SeekBar';
import TrackDetails from '../../components/Player/TrackDetails';
import LinearGradientComp from '../Shared/LinearGradient';
import {GlobalContext} from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Player = (props) => {
	//Context
	const {updateColor,selectedTrack,updateSelectedTrack,queue,updateQueue} = useContext(GlobalContext);

	const [paused, setPaused] = useState(true);
	const [totalLength, setTotalLength] = useState(1);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [repeatOn, setRepeatOn] = useState(false);
	const [shuffleOn, setShuffleOn] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const [color, setColor] = useState('');
	const [liked, setLiked] = useState(false);
	const audioElement = useRef(null);

	const selectedSongData = {
		track_name:queue[selectedTrack].title,
		album_image:queue[selectedTrack].artwork,
		artist_name:queue[selectedTrack].artist,
		track_url:queue[selectedTrack].url
	}

	const setDuration = (data) => {
		// console.log(data.duration,"dur");
		setTotalLength(Math.floor(data.duration));
	};

	// BackHandler.addEventListener("hardwareBackPress",() => {
	// 	console.log(currentPosition,"dur");
	//  	setIsChanging(false);
	//  })

	//?Todo use useMemo in Controls' child components and you dont want them to rerender
	//?todo when this parent component re renders(upon every 250ms of playing)

	useEffect(() => {
		console.log("in");
		MusicControl.setNowPlaying({
			title:queue[selectedTrack].title,
			artwork:queue[selectedTrack].artwork,
			artist:queue[selectedTrack].artist,
			description:"rezonance",
			color:0xffffff,
			rating: 1,
			duration:totalLength,
			notificationIcon: 'my_custom_icon', 
		})

		MusicControl.on(Command.pause,() => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PAUSED,
			})
			setPaused(true);
		})

		MusicControl.on(Command.closeNotification, ()=> {
			console.log("true");
		})
		
		MusicControl.on(Command.play,() => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
			})
			setPaused(false);		
		})

		MusicControl.on(Command.nextTrack, ()=> {
      		onForward();
    	})

		MusicControl.on(Command.previousTrack, ()=> {
      		onBack();
    	})

		MusicControl.enableBackgroundMode(true);
		MusicControl.enableControl('play', true);
		MusicControl.enableControl('pause', true);
		MusicControl.enableControl('stop', true);
		MusicControl.enableControl('nextTrack', true);
		MusicControl.enableControl('previousTrack', true);

		MusicControl.enableControl('changePlaybackPosition', true)
		MusicControl.enableControl('seek', true) // Android only

		MusicControl.enableControl('setRating', false)
		MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
		MusicControl.enableControl('remoteVolume', false)
		MusicControl.enableControl('closeNotification', true, { when: 'always' })

		MusicControl.setNotificationId(1, 'channel');
	},[selectedTrack])

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
				updateSelectedTrack(-1);
				const persistingData = async () => {
					const currentSelectedTrack = await AsyncStorage.getItem("selectedTrack");
					const previous = JSON.parse(currentSelectedTrack)-1;
					await AsyncStorage.setItem('selectedTrack', JSON.stringify(previous));
				}
				persistingData();
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
				updateSelectedTrack(1);
				const persistingData = async () => {
					const currentSelectedTrack = await AsyncStorage.getItem("selectedTrack");
					const next = JSON.parse(currentSelectedTrack)+1;
					await AsyncStorage.setItem('selectedTrack', JSON.stringify(next));
				}
				persistingData();
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

			<SeekBar
				onSeek={seek}
				trackLength={totalLength}
				onSlidingStart={() => setPaused(true)}
				currentPosition={currentPosition}
			/>
			<Controls
				selectedSong={selectedSongData}
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
				navig={props.navig}
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