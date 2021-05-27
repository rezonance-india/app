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
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		const fetchQueue = async () => {
			const queue = await retrieveItem('queue');
			dispatch({type: Actions.UPDATE_QUEUE, payload: queue});
		};
		fetchQueue();
	}, []);

	const updateQueue = (trackDetails) => {
		dispatch({
			type: Actions.UPDATE_QUEUE,
			payload: trackDetails,
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				queue: state.queue,
				updateQueue,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
