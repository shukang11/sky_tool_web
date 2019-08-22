import { combineReducers } from "redux";

import user from './user';
import todo from "./todo";

const rootReducers = combineReducers({
  todo,
  user,
});

export default rootReducers;
