import {
    combineReducers
} from 'redux';

import todo from './todo'
import user from './user'
import app from "./app";

const rootReducer = combineReducers({
    todo,
    user,
    app
});

export default rootReducer;