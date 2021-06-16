import React, { useEffect,useState,useContext} from "react";
import TrackPlayer from "react-native-track-player";
import { ACCENT } from "../../constants/colors";
import LinearGradientComp from "../Shared/LinearGradient";
import Controls from "./Controls";
import ImageColors from 'react-native-image-colors';
import TrackDetails from "./TrackDetails";
import { GlobalContext } from "../../context/GlobalState";
import { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

	// const {queue, updateQueue} = useContext(GlobalContext);

    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SEEK_TO
        ],
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE
        ],
    });

const NewPlayer = (props) => {
 
	const {updateColor} = useContext(GlobalContext);

    const [paused, setPaused] = useState(true);
	const [totalLength, setTotalLength] = useState(1);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [selectedTrack, setSelectedTrack] = useState(0);
	const [repeatOn, setRepeatOn] = useState(false);
	const [shuffleOn, setShuffleOn] = useState(false);
	const [color, setColor] = useState('');
	const [liked, setLiked] = useState(false);

    const setUpTrackPlayer = async () => {
        console.log("This is the global queue", props.tracks);
        try{
            console.log("this is where tracks should be added");
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(props.tracks[0]);
        }
        catch(e) {
            console.log(e,"error");
        }
    }

    useEffect(() => {
		console.log("The player screen is being rendered")
        setUpTrackPlayer();
		TrackPlayer.play();
        return () => TrackPlayer.destroy();
    },[props])

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
				setPaused(false);
				setSelectedTrack((track) => track - 1);
			}, 0);
		}
	};

	const onForward = () => {
		if (selectedTrack < props.tracks.length - 1) {
			setTimeout(() => {
				setPaused(false);
				setSelectedTrack((track) => track + 1);
			}, 0);
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
			{/* <SeekBar
				onSeek={seek}
				trackLength={totalLength}
				onSlidingStart={() => setPaused(true)}
				currentPosition={currentPosition}
			/> */}
			<Controls
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
			/>
		</LinearGradientComp>
    )
}

export default NewPlayer;
