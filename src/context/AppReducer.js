import {Actions} from './ActionsOverview';

export default (state, action) => {
	switch (action.type) {
		case Actions.UPDATE_QUEUE:
			return {
				...state,
				isPlaying: true,
				queue: action.payload,
			};
		default:
			return state;
	}
};
