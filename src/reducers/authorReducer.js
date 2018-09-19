import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state=initialState.authors, action){
	debugger;
	switch (action.type){
		case types.LOAD_AUTHORSS_SUCCESS:
			return action.authors;

		default:
			return state;
	}
}
