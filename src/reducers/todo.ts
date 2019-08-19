import { createAction, handleAction, handleActions } from "redux-actions";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const FILTER = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

// action creator
interface ITodo {
  id: number;
  text: string;
  state: any;
}

const defaultState = {
  todos: [],
  visibilityFilter: FILTER.SHOW_ALL
};

export const add_action = createAction(ADD_TODO, (todo: ITodo) => ({
  todo: todo
}));
export const toggle_action = createAction(TOGGLE_TODO, (todo: ITodo) => ({
  todo: todo
}));
export const setVisibility = createAction(
  SET_VISIBILITY_FILTER,
  (filter: string) => ({
    filter: filter
  })
);

// action handler
const addHandle = handleAction(
  ADD_TODO,
  (state, action) => {
    var todo: ITodo = (action.payload as { [key: string]: any })["todo"];
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: todo.id,
          text: todo.text,
          state: todo.state
        }
      ]
    };
  },
  defaultState
);

const ToggleHandle = handleAction(
  TOGGLE_TODO,
  (state, action) => {
    var todo: ITodo = (action.payload as { [key: string]: any })["todo"];
    return {
      ...state,
      todos: state.todos.map(t => {
        if (t.id === todo.id) {
          t.state = todo.state;
        }
        return t;
      })
    };
  },
  defaultState
);

const filterHandle = handleAction(
  SET_VISIBILITY_FILTER,
  (state, action) => {
    var filter: string = (action.payload as { [key: string]: string })[
      "filter"
    ];
    return {
      ...state,
      todos: [...state.todos],
      visibilityFilter: filter
    };
  },
  defaultState
);

const reducers = handleActions(
  {
    add_action: addHandle,
    toggle_action: ToggleHandle,
    setVisibility: filterHandle
  },
  defaultState
);

export default reducers;
