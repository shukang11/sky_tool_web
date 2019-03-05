import {
    combineReducers
} from 'redux';

import todo from './todo'
import user from './user'
import app from "./app";
import rss from './rss'

const rootReducer = combineReducers({
    todo,
    user,
    app,
    rss
});

export default rootReducer;