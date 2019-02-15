import {
    createAction,
    handleAction,
    handleActions
} from 'redux-actions';

import Request from "../http/request";
import { HOST, PREFIX_PATH } from "../http/api";

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const FILTER = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
};

const defaultState = {
    todos: [],
    visibilityFilter: FILTER.SHOW_ALL
};

// action creator

export const add_action = createAction(ADD_TODO, (text) => ({text: text}));
export const toggle_action = createAction(TOGGLE_TODO, (id) => ({id: id}));
export const setVisibility = createAction(SET_VISIBILITY_FILTER, (filter) => ({filter: filter}));

export const requestTodos = ({ filter }) => dispatch => {
	const url = `${HOST}${PREFIX_PATH}/todo/filter/${filter}`
	Request.post(url, {}, r => {
		for (const todo in r) {
			dispatch(add_action(r[todo].todo_title))
		}
	}, e => {
		console.log(e);
	})
}
// action handler

const addHandle = handleAction(ADD_TODO, (state, action) => {
	return {
		...state,
		todos: [...state.todos, {
			id:state.todos.lenth,
			text:action.payload.text
		}]
	}
}, defaultState);

const reducers = handleActions({
    [add_action]: addHandle
}, defaultState);

export default reducers;
