import { createAction, handleActions, handleAction } from "redux-actions";

const SET_TODOS = "SET_TODOS";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

declare const FILTERSTYLE: ["all", "completed", "active"];
export declare type FilterStyle = (typeof FILTERSTYLE)[number];

// action creator
export declare interface ITodoModel {
  id: number;
  text: string;
  state: number; // 1 未完成 2 已完成 3 已删除
}

export declare interface ITodo {
  todos: Array<ITodoModel>;
  visibilityFilter: FilterStyle;
}

const defaultState: ITodo = {
  todos: [],
  visibilityFilter: 'all'
};

interface Action<T> {
  type: string;
  payload: T;
  error?: boolean;
}

export const set_visibility_filter_action = function(filter: FilterStyle): Action<FilterStyle> {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter,
  }
}

export const set_todos_action = function(todos: Array<ITodoModel>): Action<Array<ITodoModel>> {
  return {
    type: SET_TODOS,
    payload: todos,
  }
}

export const toggle_todo_action = function(id: number): Action<number> {
  return {
    type: TOGGLE_TODO,
    payload: id
  }
}

// action handler
const reducers = handleActions(
  {
    [SET_VISIBILITY_FILTER]: (state, action: Action<FilterStyle>) => {
      return {
        todos: state.todos,
        visibilityFilter: action.payload,
      };
    },
    
  },
  defaultState
);

export default reducers;
