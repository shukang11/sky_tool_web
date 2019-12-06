import { handleActions, createAction } from 'redux-actions';

const ADD_RSS = 'ADD_RSS';

export declare interface IRssModel {
    id: number;
    link: string;
    title: string;
    description: string;
}

export declare interface IRss {
    rsses?: Array<IRssModel>;
}

const defaultState: IRss = {
    rsses: [],
}

export const add_rss_action = createAction(
    ADD_RSS,
    (rsses: Array<IRssModel>) => ({ rsses })
);

// action handlers
const reducers = handleActions(
    {
        [ADD_RSS]: (state: IRss, action) => {
            return {
                ...state,
                rsses: action.payload.rsses
            }
        }
    },
    defaultState
);

export default reducers;