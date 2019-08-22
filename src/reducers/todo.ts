import { handleActions, createAction } from "redux-actions";

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
  todos?: Array<ITodoModel>;
  visibilityFilter?: FilterStyle;
  toggleId?: number;
}

const defaultState: ITodo = {
  todos: [],
  visibilityFilter: 'all'
};


export const set_visibility_filter_action = createAction(
  SET_VISIBILITY_FILTER,
  (filter: FilterStyle) => ({filter: filter})
)

export const set_todos_action = createAction(
  SET_TODOS, 
  (todos: Array<ITodoModel>) => ({todos: todos})
);

export const toggle_todo_action = createAction(
  TOGGLE_TODO,
  (toggleId: number) => ({toggleId: toggleId})
  );

// action handler
const reducers = handleActions(
  {
    [SET_VISIBILITY_FILTER]: (state: ITodo, action) => {
      return {
        ...state,
        visibilityFilter: action.payload.visibilityFilter
      }
    },
    [TOGGLE_TODO]: (state: ITodo, action) => {
      return {
        ...state,
        todos: state.todos.map( (item) => {
          return {
            ...item, 
            state: item.id===action.payload.toggleId&&item.state===1 ? 2 : 1
          }
        })
      }
    },
    [SET_TODOS]: (state: ITodo, action) => {
      return {
        ...state,
        todos: action.payload.todos
      }
    },
  },
  defaultState
);

export default reducers;
