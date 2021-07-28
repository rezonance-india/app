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
	
const Player = (props) => {
		
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

    //For using in chat modal
	const selectedSongData = {
		track_name:"Vertigo",
		album_image:"https://i.scdn.co/image/ab67616d0000b273c43edd2cf01edf73bf0b97a3",
		artist_name:"Khalid",
		track_url:"https://sdlhivkecdnems06.cdnsrv.jio.com/jiosaavn.cdn.jio.com/385/a6fa35ad1a1313d8d3e412352fe9c51a_160.mp4"
	}

	const setUpTrackPlayer =  () => {
		console.log("in setup");
		TrackPlayer.setupPlayer()
		.then((res) => {
			console.log(res,"Res");
		}).catch((err) => {
			console.log(err,"err");
		})
	}

	useEffect(() => {
		setUpTrackPlayer();
		return () => TrackPlayer.destroy();
	},[])
	
	// const track = props.tracks[selectedTrack];
	
    useEffect(() => {
		TrackPlayer.getCurrentTrack()
		.then((cur) => {
			console.log(cur,"cur");
		}).catch((err) => {
			console.log(err);
		})
    },[])

	// useEffect(() => {
	// 	if (!isSeeking && position && duration) {
	// 		setSliderValue(position / duration);
	// 	}
	// },[position, duration]);

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors("https://i.scdn.co/image/ab67616d0000b273c43edd2cf01edf73bf0b97a3", {
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
	}, []);

	const onBack = async () => {
		// if (currentPosition < 10 && selectedTrack > 0) {
			setTimeout(() => {
				setPaused(false);
				setSkipping(true);
			}, 0);
			TrackPlayer.skipToPrevious();
		// }
	};

	const onForward = async () => {
		// if (selectedTrack < props.tracks.length - 1) {
			setTimeout(() => {
				setPaused(false);
				setSkipping(true);
                TrackPlayer.skipToNext();
			}, 0);
			TrackPlayer.skipToNext();
		// }
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
				track_name={"Vertigo"}
				artist_name={"Khalid"}
				album_image={"https://i.scdn.co/image/ab67616d0000b273c43edd2cf01edf73bf0b97a3"}
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
				backwardDisabled={false}
                forwardDisabled={true}
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

export default Player;
