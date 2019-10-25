import { createAction, handleAction, handleActions } from "redux-actions";
import { string } from "prop-types";

const SET_TOKEN = "SET_TOKEN";

export declare interface IUSERState {
  token?: string;
  isLogedIn?: boolean;
}

const defaultState: IUSERState = {
  token: null,
  isLogedIn: localStorage.getItem('token') !== undefined,
};

export const setTokenAction = createAction<IUSERState, string | null>(
  SET_TOKEN,
  (token?: string) => ({ token: token })
);

const reducers = handleActions(
  {
    [SET_TOKEN]: (state, action) => {
      // set cookie
      var { token } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        token: token,
        isLogedIn: token === undefined,
      }
    }
  },
  defaultState
);

export default reducers;
