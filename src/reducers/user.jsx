import { combineReducers } from "redux";
import { HOST, PREFIX_PATH, REQUEST_STATE } from "../http/api";
import Request from '../http/request';
const LOGIN = "LOGIN";

const defaultState = {
  req_token: localStorage.getItem("req_token")
};

export function UserLogin(username, password) {
  const url = `${HOST}${PREFIX_PATH}/user/login`;
  return (dispatch) => {
    Request.post(url, {'email': username, 'password': password}, (json) => {
      const req_token = json["token"];
          if (req_token == null || req_token == "") {
            localStorage.removeItem("req_token");
            dispatch({
              type: LOGIN+REQUEST_STATE.FAILURE,
              req_token: ""
            })
            return;
          }
          localStorage.setItem('req_token', json['token']);
          dispatch({
            type: LOGIN+REQUEST_STATE.SUCCESS,
            req_token: localStorage.getItem('req_token')
          })
    }, (error) => {
      console.log(`on error ${error}`);
    })
  };
}

function reducers(state=defaultState, action) {
    switch (action.type) {
        case LOGIN+REQUEST_STATE.SUCCESS:
        return {
            ...state,
            req_token: action.req_token
        }
        case LOGIN+REQUEST_STATE.FAILURE:
        return {
            ...state,
            req_token: ""
        }
        default:
        return state;
    }
}

export default reducers;
