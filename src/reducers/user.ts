import { createAction, handleActions } from "redux-actions";

const SET_TOKEN = "SET_TOKEN";
const SET_USER_INFO = "SET_USER_INFO";

declare const USER_STATUS: ["unactive", "normal", "abnormal", "unregisted"];
export declare type UserStatus = (typeof USER_STATUS)[number];

declare const SEX: ["unset", "man", "women"]
export declare type Sex = (typeof SEX)[number];

export declare interface IUSERState {
  token?: string;
  isLogedIn?: boolean;
  email?: string;
  phone?: string;
  status?: UserStatus;
  sex?: Sex;
}

const defaultState: IUSERState = {
  token: null,
  isLogedIn: localStorage.getItem('token') !== undefined,
};

export const setTokenAction = createAction<IUSERState, string | null>(
  SET_TOKEN,
  (token?: string) => ({ token: token })
);

export const setUserInfo = createAction<IUSERState, IUSERState>(
  SET_USER_INFO,
  (user: IUSERState) => ({
    ...user,
  })
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
    },
    [SET_USER_INFO]: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        phone: action.payload.phone,
        status: action.payload.status,
        sex: action.payload.sex,
      }
    },
  },
  defaultState
);

export default reducers;
