import {Actions} from './ActionsOverview';

export default (state, action) => {
	switch (action.type) {
		case Actions.UPDATE_QUEUE:
			return{
				...state,
				queue:action.payload
			}
		case Actions.UPDATE_USER:
			return{
				...state,
				user:action.payload
			}
		case Actions.UPDATE_TOKEN:
			return {
				...state,
				token: action.payload,
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
		case Actions.UPDATE_SELECTEDTRACK:
			return{
				...state,
				selectedTrack:state.selectedTrack+action.payload
			}
		case Actions.UPDATE_MESSAGES:
			return{
				...state,
				messages:action.payload				
			}
		default:
			return state;
	}
};
