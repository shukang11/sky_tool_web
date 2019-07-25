import { createAction, handleAction, handleActions } from "redux-actions";
import Request from "../http/request";
import { HOST, PREFIX_PATH } from "../http/api";

const ADD_RSS = "ADD_RSS";

const defaultState = {
    rss: [],
};

export const add_action = createAction(ADD_RSS, rss => (rss));

export const request_Rss = () => dispatch => {
    const url = `${HOST}${PREFIX_PATH}/rss/limit`
    Request.post(url, {}, 
        r => {
            if (!r) { return; }
            var list = r.list;
            for (const i in list) {
                dispatch(add_action({"link": list[i].link, "rss_id": list[i].id}))
            }
    }, e => {
        console.log(e);
    })
}

export const request_addRss = (rss_link) => dispatch => {
    const url = `${HOST}${PREFIX_PATH}/rss/add`
    Request.post(url, {
        "source": rss_link
    }, r => {
        dispatch(add_action({"link": rss_link, "rss_id": r.rss_id}))
    }, e => {
        console.log(e);
    })
}

function reducers(state=defaultState, action) {
    switch (action.type) {
        case ADD_RSS:
        return { ...state, rss: [...state.rss, action.payload] }
        default:
        return defaultState
    }
}

export default reducers;