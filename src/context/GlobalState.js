import React, {createContext, useEffect, useReducer,useState} from 'react';
import AppReducer from './AppReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions} from './ActionsOverview';

const initialState = {
	user:null,
	token:null,
	queue: [],
	color: '',
	pausedState:true,
	selectedTrack:0,
	messages:[],
};

const retrieveItem = async (key) => {
	try {
		const data = await AsyncStorage.getItem(key);
		return data ? JSON.parse(data) : initialState[key];
	} catch (e) {
		console.log('Failed to fetch the data from storage');
	}
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		const fetchQueue = async () => {
			const queue = await retrieveItem('queue');
			dispatch({type: Actions.UPDATE_QUEUE, payload: queue});
		};

		const fetchUser = async () => {
			const user = await retrieveItem("user");
			dispatch({
				type:Actions.UPDATE_USER,payload:user
			})
		}

		const fetchToken = async () => {
			const token = await retrieveItem("token");
			dispatch({
				type:Actions.UPDATE_TOKEN,payload:token
			})
		}

		// const fetchPausedState = async () => {
		// 	const pausedState = await retrieveItem("pausedState");
		// 	dispatch({
		// 		type:Actions.UPDATE_PAUSEDSTATE,
		// 		payload:pausedState
		// 	})
		// }

		const fetchSelectedTrack = async () => {
			const selectedTrack = await retrieveItem("selectedTrack");
			dispatch({
				type:Actions.UPDATE_SELECTEDTRACK,
				payload:selectedTrack
			})
		}

		const fetchMessages = async () => {
			const messages = await retrieveItem("messages");
			dispatch({
				type:Actions.UPDATE_MESSAGES,
				payload:messages
			})
		}

		fetchUser();
		fetchToken();
		fetchQueue();
		// fetchPausedState();
		fetchSelectedTrack();
		fetchMessages();
	}, []);

	const updateUser = (userDetails) => {
		dispatch({
			type:Actions.UPDATE_USER,
			payload:userDetails
		})
	}

	const updateToken = (token) => {
		dispatch({
			type:Actions.UPDATE_TOKEN,
			payload:token
		})
	}

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

	const updateSelectedTrack = (selectedIndex) => {
		dispatch({
			type: Actions.UPDATE_SELECTEDTRACK,
			payload: selectedIndex
		})
	}

	const updateMessages = (messages) => {
		dispatch({
			type:Actions.UPDATE_MESSAGES,
			payload:messages
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				user:state.user,
				token:state.token,
				queue: state.queue,
				color: state.color,
				pausedState:state.pausedState,
				selectedTrack:state.selectedTrack,
				messages:state.messages,
				updateUser,
				updateToken,
				updateQueue,
				updateColor,
				updatePausedState,
				updateSelectedTrack,
				updateMessages
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
