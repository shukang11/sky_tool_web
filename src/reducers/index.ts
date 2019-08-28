import { combineReducers } from "redux";

import user from './user';
import todo from "./todo";
import app from './app';

const rootReducers = combineReducers({
  todo,
  user,
  app,
});

export default rootReducers;
