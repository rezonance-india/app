import React, { useEffect,useState,useContext} from "react";
import Slider from '@react-native-community/slider';
import TrackPlayer from "react-native-track-player";
import { ACCENT } from "../../constants/colors";
import LinearGradientComp from "../Shared/LinearGradient";
import Controls from "./Controls";
import ImageColors from 'react-native-image-colors';
import TrackDetails from "./TrackDetails";
import { GlobalContext } from "../../context/GlobalState";
import { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING,useTrackPlayerProgress } from 'react-native-track-player';
import NewSeekBar from "./NewSeekBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

TrackPlayer.updateOptions({
	capabilities: [
		TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
			TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SEEK_TO,
        ],
    });
	
const NewPlayer = (props) => {
			
	const {updateColor,selectedTrack,updateSelectedTrack,queue} = useContext(GlobalContext);
	
	const [paused, setPaused] = useState(true);
	const [currentPosition, setCurrentPosition] = useState(0);
	// const [selectedTrackLocal, setSelectedTrackLocal] = useState(0);
	const [repeatOn, setRepeatOn] = useState(false);
	const [shuffleOn, setShuffleOn] = useState(false);
	const [color, setColor] = useState('');
	const [liked, setLiked] = useState(false);
	const [skipping,setSkipping] = useState(false);
	const [sliderValue, setSliderValue] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false); 
	const {position, duration} = useTrackPlayerProgress(250);


	const selectedSongData = {
		track_name:queue[0].title,
		album_image:queue[0].artwork,
		artist_name:queue[0].artist,
		track_url:queue[0].url
	}

	const setUpTrackPlayer =  () => {
		TrackPlayer.setupPlayer()
		.then((res) => {
		}).catch((err) => {
			console.log(err);
		})

		TrackPlayer.add(queue)
		.then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}

	useEffect(() => {
		// const unsubscribe = props.navig.addListener('focus', () => {
			setUpTrackPlayer();
			return () => TrackPlayer.destroy();
    	// });
    	// return unsubscribe;
	},[queue])

	const track = props.tracks[selectedTrack];
	
	useEffect(() => {
		if (!isSeeking && position && duration) {
			setSliderValue(position / duration);
		}
	},[position, duration]);

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors(track.artwork, {
				fallback: '#7f8c8d',
			});
			if (colors.platform === 'android') {
				const {lightVibrant,average} = colors;

				if(lightVibrant === "#000000"){
					averageColor = average;
				}
				else {
					averageColor = lightVibrant;
				}
				setColor(averageColor);
				updateColor(averageColor)
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
				updateColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, [track]);

	useEffect(() => {
		const getTrack = 
		() => {
			TrackPlayer.getQueue()
			.then((res) => {
				console.log(res,"whole queue");
			}).catch((err) => {
				console.log("error",err);
			})
			TrackPlayer.getCurrentTrack()
			.then((curr) => {
				console.log("curr track",curr);
			}).catch((err) => {
				console.log(err);
			});
			// console.log(queue,"queue from new",getCurr,"get Curr");
		}
		getTrack();
	},[props,selectedTrack])

	const onBack = async () => {
		if (currentPosition < 10 && selectedTrack > 0) {
			setTimeout(() => {
				setPaused(false);
				setSkipping(true);
				// setSelectedTrackLocal((track) => track - 1);
				updateSelectedTrack(-1);
				const persistingData = async () => {
					const currentSelectedTrack = await AsyncStorage.getItem("selectedTrack");
					const previous = JSON.parse(currentSelectedTrack)-1;
					await AsyncStorage.setItem('selectedTrack', JSON.stringify(previous));
				}
				persistingData();
			}, 0);
			TrackPlayer.skipToPrevious()
			.then((track) => {
				console.log(track,"track");
			}).catch((err) => {
				console.log(err);
			});
		}
	};

	const onForward = async () => {
		if (selectedTrack < props.tracks.length - 1) {
			setTimeout(() => {
				setPaused(false);
				setSkipping(true);
				// setSelectedTrackLocal((track) => track + 1);
				updateSelectedTrack(1);
				const persistingData = async () => {
					const currentSelectedTrack = await AsyncStorage.getItem("selectedTrack");
					const next = JSON.parse(currentSelectedTrack)+1;
					await AsyncStorage.setItem('selectedTrack', JSON.stringify(next));
				}
				persistingData();
			}, 0);
			TrackPlayer.skipToNext()
			.then((track) => {
				console.log(track,"track");
			}).catch((err) => {
				console.log(err);
			});
		}
	};

	const events = [
		TrackPlayerEvents.PLAYBACK_STATE,
		TrackPlayerEvents.PLAYBACK_ERROR
	];

	useTrackPlayerEvents(events, (event) => {
		if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
			console.warn('An error occured while playing the current track.');
		}
		if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
			if(event.state === 2){
				setPaused(true);
			}
			else if(event.state === 3) {
				setPaused(false);
			}
		}
	});

	const slidingStarted = () => {
		setIsSeeking(true);
	};

	//this function is called when the user stops sliding the seekbar
	const slidingCompleted = async value => {
		await TrackPlayer.seekTo(value * duration);
		setSliderValue(value);
		setIsSeeking(false);
	};

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
			<NewSeekBar
				onSlidingComplete={slidingCompleted}
				trackLength={duration}
				sliderValue={sliderValue}
				onSlidingStart={slidingStarted}
				currentPosition={position}
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
				onPressPlay={async () => {
					await TrackPlayer.play();
					setPaused(false);
				}}
				onPressPause={async () => {
					await TrackPlayer.pause();                    
					setPaused(true);
				}}
				onBack={onBack}
				onForward={onForward}
				paused={paused}
				navig={props.navig}
			/>
		</LinearGradientComp>
	)
}

export default NewPlayer;
