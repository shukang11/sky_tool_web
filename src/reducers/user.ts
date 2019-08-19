import { createAction, handleAction, handleActions } from "redux-actions";
import { string } from "prop-types";

const LOGIN = "LOGIN";

const SET_TOKEN = "SET_TOKEN";

interface IUSERState {
  token?: string;
}
const defaultState: IUSERState = {
  token: null
};

export const setTokenAction = createAction<IUSERState, string>(
  SET_TOKEN,
  (token: string) => ({ token: token })
);

const reducers = handleActions(
  {
    [SET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload.token
    })
  },
  defaultState
);

export default reducers;
