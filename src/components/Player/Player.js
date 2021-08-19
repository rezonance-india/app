import React, {useState, useRef, useEffect, useContext} from 'react';
import {Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, ToastAndroid} from 'react-native';
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
import { apiUrl } from '../../constants/config';
import axios from 'axios';

const Player = (props) => {
	//Context
	const {updateColor,selectedTrack,updateSelectedTrack,queue,updateQueue,
		updatePausedState,pausedState,likedSongs,updateLikedSongs
	} = useContext(GlobalContext);

	// const [paused, setPaused] = useState(true);
	const [totalLength, setTotalLength] = useState(1);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [repeatOn, setRepeatOn] = useState(false);
	const [shuffleOn, setShuffleOn] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const [color, setColor] = useState('');
	const [liked, setLiked] = useState(false);
	const [loading,setLoading] = useState(false);
	const audioElement = useRef(null);

	const selectedSongData = {
		track_name:queue[selectedTrack].title,
		album_image:queue[selectedTrack].artwork,
		artist_name:queue[selectedTrack].artist,
		track_url:queue[selectedTrack].url,
		track_id:queue[selectedTrack].id
	}

	const setDuration = (data) => {
		setLoading(false);
		setTotalLength(Math.floor(data.duration));
	};

	const loadingStarts = () => {
		setLoading(true);
	}

	useEffect(() => {
		let c=0;
		
		likedSongs.map((song) => {
			if(song._id == queue[selectedTrack]?.id){
				setLiked(true);
				c++;
				return;
			}	
		})

		if(c==0){
			setLiked(false);
		}


		if(queue[selectedTrack]?.url.slice((queue[selectedTrack].url.length)-11,queue[selectedTrack.length]) == "None_96.mp4") {
			ToastAndroid.show("This song is currently not available", ToastAndroid.LONG);		
		}
	},[selectedTrack,props])

	useEffect(() => {
		if(queue[selectedTrack]?.url.slice((queue[selectedTrack].url.length)-11,queue[selectedTrack.length]) == "None_96.mp4") {
			ToastAndroid.show("This song is currently not available", ToastAndroid.LONG);		
		}
	},[selectedTrack])

	useEffect(() => {
		//Pausing song on coming to end
		if(selectedTrack === queue.length - 1 && !repeatOn && loading){
						
			//Add simmilar songs to the queue

			axios
				.post(
					`${apiUrl}recommend`,
					{
						ref_id: track.id
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				)
				.then((res) => {
					const result = res.data;

					const tracks = queue;

					// for(let i =3,j=1;i<res.data.length;i+=3,j++){
						let i = 4;

						tracks[selectedTrack+1] = {
							title : result[i].track_name,
							artist: result[i].artist_name,
							artwork: result[i].album_image,
							url: result[i].track_url,
							id: result[i].track_id,
						}
					// }

					updateQueue(tracks);
						const persistingData = async () => {
							await AsyncStorage.setItem(
								'queue',
								JSON.stringify(tracks),
						);
					};
					persistingData();
				})
				.catch((err) => {
					console.log(err);
				});	
		}

	},[selectedTrack, loading, repeatOn])


	//?Todo use useMemo in Controls' child components and you dont want them to rerender
	//?todo when this parent component re renders(upon every 250ms of playing)

	useEffect(() => {
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

		MusicControl.on(Command.pause, () => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PAUSED,
			})
			updatePausedState(true);
		})

		MusicControl.on(Command.closeNotification, ()=> {
			console.log("true");
		})
		
		MusicControl.on(Command.play,() => {
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
			})
			updatePausedState(false);
			// await AsyncStorage.setItem('pausedState',false);
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
		MusicControl.enableControl('nextTrack', true);
		MusicControl.enableControl('previousTrack', true);

		MusicControl.enableControl('changePlaybackPosition', true)
		MusicControl.enableControl('seek', true) // Android only

		MusicControl.enableControl('setRating', false)
		MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
		MusicControl.enableControl('remoteVolume', false)
		MusicControl.enableControl('closeNotification', true, { when: 'paused' })

		MusicControl.setNotificationId(1, 'channel');
	},[selectedTrack,props])

	const setTime = (data) => {
		setCurrentPosition(Math.floor(data.currentTime));
	};

	const seek = (time) => {
		time = Math.round(time);
		audioElement.current && audioElement.current.seek(time);
		setCurrentPosition(time);
		updatePausedState(false);
	};

	const onBack = () => {
		if (currentPosition < 10 && selectedTrack > 0) {
			audioElement.current && audioElement.current.seek(0);
			setIsChanging(true);
			setTimeout(() => {
				setCurrentPosition(0);
				updatePausedState(false);
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
		// if (selectedTrack < props.tracks.length - 1) {
			audioElement.current && audioElement.current.seek(0);
			setIsChanging(true);
			setTimeout(() => {
				setCurrentPosition(0);
				updatePausedState(false);
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
		// }
	};

	const pressLike = () => {
		if(!liked) {
			setLiked(true);
			
			const trackDetails = likedSongs;
			trackDetails.push({
				trackName: queue[selectedTrack].title,
				artistName: queue[selectedTrack].artist,
				albumArt: queue[selectedTrack].artwork,
				trackUrl: queue[selectedTrack].url,
				_id:queue[selectedTrack].id
			});

			updateLikedSongs(trackDetails);

			const persistingData = async () => {
				await AsyncStorage.setItem(
					'likedSongs',
					JSON.stringify(trackDetails),
				);
			};

			persistingData();

			ToastAndroid.show("Added to liked songs",ToastAndroid.SHORT);
		}
		else {
			setLiked(false);

			let trackDetails = likedSongs;
		
			let newLikedSongs  = trackDetails.filter((song) => {
				return song._id !== queue[selectedTrack].id
			})

			console.log(newLikedSongs,"removed liked songs");

			updateLikedSongs(newLikedSongs);

			const persistingData = async () => {
				await AsyncStorage.setItem(
					'likedSongs',
					JSON.stringify(newLikedSongs),
				);
			};

			persistingData();

			ToastAndroid.show("Removed from liked songs",ToastAndroid.SHORT);
		}
	}

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
				averageColor = colors.vibrant;
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

	const onEnd = () => {
		console.log("in end");
	}

	const video = isChanging ? null : (
		<Video
			source={{uri: track.url}} // Can be a URL or a local file.
			ref={audioElement}
			playInBackground={true}
			playWhenInactive={true}
			paused={pausedState} // Pauses playback entirely.
			resizeMode="cover" // Fill the whole screen at aspect ratio.
			repeat={repeatOn} // Repeat forever.
			onLoadStart={loadingStarts}
			onLoad={setDuration} // Callback when video loads
			onProgress={setTime} // Callback every ~250ms with currentTime
			onEnd={onEnd} // Callback when playback finishes
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
				onSlidingStart={() => updatePausedState(true)}
				currentPosition={currentPosition}
			/>
			<Controls
				selectedSong={selectedSongData}
				onPressLike={pressLike}
				liked={liked}
				onPressRepeat={() => setRepeatOn((repeatOn) => !repeatOn)}
				repeatOn={repeatOn}
				shuffleOn={shuffleOn}
				backwardDisabled={selectedTrack === 0}
				forwardDisabled={selectedTrack === props.tracks.length - 1}
				onPressShuffle={() => setShuffleOn((shuffleOn) => !shuffleOn)}
				onPressPlay={() => {
					MusicControl.updatePlayback({
						state: MusicControl.STATE_PLAYING,
					})		
					updatePausedState(false);
					// await AsyncStorage.setItem('pausedState',false);
				}}
				onPressPause={() => {
					MusicControl.updatePlayback({
						state: MusicControl.STATE_PAUSED,
					})
					updatePausedState(true);
					// await AsyncStorage.setItem('pausedState',true);
				}}
				navig={props.navig}
				onBack={onBack}
				onForward={onForward}
				paused={pausedState}
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