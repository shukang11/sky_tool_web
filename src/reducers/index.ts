import { combineReducers } from "redux";

import user from './user';
import todo from "./todo";
import app from './app';
import rss from './rss';

const rootReducers = combineReducers({
  todo,
  user,
  app,
  rss,
});

export default rootReducers;
