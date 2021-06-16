import React, {createContext, useEffect, useReducer} from 'react';
import AppReducer from './AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from './ActionsOverview';

const retrieveItem = async (key) => {
	try {
		const data = await AsyncStorage.getItem(key);
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.log('Failed to fetch the data from storage');
	}
};

const initialState = {
	queue: [],
	isPlaying: false,
	color: '',
	pausedState:true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		const fetchQueue = async () => {
			const queue = await retrieveItem('queue');
			dispatch({type: Actions.UPDATE_QUEUE, payload: queue});
		};

		const fetchPausedState = async () => {
			const pausedState = await retrieveItem("pausedState");
			dispatch({
				type:Actions.UPDATE_PAUSEDSTATE,
				payload:pausedState
			})
		}
		fetchQueue();
		fetchPausedState();
	}, []);

	const updateQueue = (trackDetails) => {
		dispatch({
			type: Actions.UPDATE_QUEUE,
			payload: trackDetails,
		});
	};

	const updateColor = (color) => {
		dispatch({
			type: Actions.UPDATE_COLOR,
			payload: color,
		});
	};

	const updatePausedState = (currentState) => {
		dispatch({
			type: Actions.UPDATE_PAUSEDSTATE,
			payload:currentState
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				queue: state.queue,
				color: state.color,
				pausedState:state.pausedState,
				updateQueue,
				updateColor,
				updatePausedState
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
