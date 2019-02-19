import { createAction } from "redux-actions";

export const types = {
  START_FETCH: "app/START_FETCH",
  FINISH_FETCH: "app/FINISH_FETCH",
  SET_ERROR: "app/SET_ERROR"
};

const TOGGLE_MENU_COLLAPSED = "ToggleMenuCollapsed";

export const appActions = {
  startFetch: () => {
    return { type: types.START_FETCH };
  },
  finishFetch: () => {
    return { type: types.FINISH_FETCH };
  },
  setError: e => {
    return { type: types.SET_ERROR, payload: e };
  }
};

export const ToggleMenuCollapsed = () => ({ type: TOGGLE_MENU_COLLAPSED });

// default state
export const initialState = {
  isFetching: false,
  error: null,
  isMenuCollapsed: false
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case types.START_FETCH:
      return { ...state, isFetching: true };
    case types.FINISH_FETCH:
      return { ...state, isFetching: false };
    case types.SET_ERROR:
      return { ...state, error: action.payload };
    case TOGGLE_MENU_COLLAPSED:
      return { ...state, isMenuCollapsed: !state.isMenuCollapsed };
    default:
      return state;
  }
}

export default reducers;
