import {Actions} from './ActionsOverview';

export default (state, action) => {
	switch (action.type) {
		case Actions.UPDATE_QUEUE:
			return {
				...state,
				isPlaying: true,
				queue: action.payload,
			};
		case Actions.UPDATE_COLOR:
			return {
				...state,
				color: action.payload,
			};
		case Actions.UPDATE_PAUSEDSTATE:
			return{
				...state,
				pausedState:action.payload
			}
		default:
			return state;
	}
};
