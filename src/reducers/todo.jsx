import { createAction, handleAction, handleActions } from "redux-actions";

import Request from "../http/request";
import { HOST, PREFIX_PATH } from "../http/api";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const FILTER = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const defaultState = {
  todos: [],
  visibilityFilter: FILTER.SHOW_ALL
};

// action creator

export const add_action = createAction(ADD_TODO, todo => ({ todo: todo }));
export const toggle_action = createAction(TOGGLE_TODO, todo => ({ todo: todo }));
export const setVisibility = createAction(SET_VISIBILITY_FILTER, filter => ({
  filter: filter
}));

export const requestTodos = ({ filter }) => dispatch => {
  const url = `${HOST}${PREFIX_PATH}/todo/filter/${filter}`;
  Request.post(
    url,
    {},
    r => {
      for (const todo in r) {
        dispatch(add_action(r[todo]));
      }
    },
    e => {
      console.log(e);
    }
  );
};

export const requestFinishTodo = (id) => dispatch => {
  const url = `${HOST}${PREFIX_PATH}/todo/finish`;
  const params = {todo_id: id};
  Request.post(
    url,
    params,
    r => {
      dispatch(toggle_action(r))
    },
    e => {
      console.log(e);
    }
  );
}

export const requestUndoTodo = (id) => dispatch => {
  const url = `${HOST}${PREFIX_PATH}/todo/undo`;
  const params = {todo_id: id};
  Request.post(
    url,
    params,
    r => {
      dispatch(toggle_action(r))
    },
    e => {
      console.log(e);
    }
  );
}

export const requestAddTodo = (text) => dispatch => {
  const url = `${HOST}${PREFIX_PATH}/todo/add`;
  const params = { title: text };
  Request.post(
    url,
    params,
    r => {
      dispatch(add_action({"todo_id": r.todo_id, "todo_title": text, "todo_state": 1}))
    },
    e => {
      console.log(e);
    }
  );
};
// action handler

const addHandle = handleAction(
  ADD_TODO,
  (state, action) => {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: action.payload.todo.todo_id,
          text: action.payload.todo.todo_title,
          state: action.payload.todo.todo_state
        }
      ]
    };
  },
  defaultState
);

const ToggleHandle = handleAction(
  TOGGLE_TODO,
  (state, action) => {
    return {
      ...state,
      todos: state.todos.map(t => {
        if (t.id === action.payload.todo.todo_id) {
          console.log(action.payload.todo.todo_state);
          t.state = action.payload.todo.todo_state;
        }
        return t
      })
    };
  },
  defaultState
);

const filterHandle = handleAction(
	SET_VISIBILITY_FILTER,
	(state, action) => {
		return {
		...state,
		todos: [
			...state.todos,
		],
		visibilityFilter: action.payload.filter
		}
  },
  defaultState
)

const reducers = handleActions(
  {
  [add_action]: addHandle,
  [toggle_action]: ToggleHandle,
	[setVisibility]: filterHandle
  },
  defaultState
);

export default reducers;
