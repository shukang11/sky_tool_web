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
interface ITodoModel {
  id: number;
  text: string;
  state: any;
}

interface ITodo {
  todos: Array<ITodoModel>;
  visibilityFilter: string;
}

const defaultState: ITodo = {
  todos: [],
  visibilityFilter: FILTER.SHOW_ALL
};

export const set_visibility_filter_action = createAction<ITodo, string>(
  SET_VISIBILITY_FILTER,
  filter => ({
    visibilityFilter: filter,
    todos: []
  })
);

// action handler
const reducers = handleActions<ITodo>(
  {
    [TOGGLE_TODO]: (state, action) => {
      var newState: ITodo = {
        todos: state.todos,
        visibilityFilter: action.payload.visibilityFilter
      };
      return newState;
    }
  },
  defaultState
);

export default reducers;
