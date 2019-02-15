import { RECEIVE_DATA, REQUEST_DATA } from '../http/api';

var Request = {};

Request.get = function(url, params, successcallback, errorcallback) {
    const request = fetch(url, params);
    request.then(resp => resp.json())
    .then(json => successcallback(json))
    .catch(error => errorcallback(error))
}

Request.post = function(url, params, successcallback, errorcallback) {
    var formData = new FormData();
    for (var key in params) {
        formData.append(key, params[key])
    }
    const token = localStorage.getItem('req_token')
    formData.append('token', token ? token : '')
    const request = fetch(url, {
        method: "post",
        body: formData
      });
    request.then(resp => resp.json())
    .then(json => successcallback(json))
    .catch(error => errorcallback(error))
}

// new method for async http request

const requestData = (category) => ({
    type: REQUEST_DATA,
    category
})

export const receiveData = (data, category) => ({
    trpe: RECEIVE_DATA,
    data,
    category
});

// export const fetchData = ({category, params}) => dispatch => {
//     dispatch(requestData(category))
//     return allFetch[category](params).then(res => dispatch(receiveData(res, category)));
// }

export default Request;