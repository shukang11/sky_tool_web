var Request = {};

Request.get = function(url, params, successcallback, errorcallback) {
    const request = fetch(url, params);
    request.then(resp => resp.json())
    .then(json => successcallback(json))
    .catch(error => errorcallback(error))
}

Request.post = function(url, params, successcallback, errorcallback) {
    let formData = new FormData();
    for (var key in params) {
        formData.append(key, params[key])
    }
    console.log(params, formData);
    
    const request = fetch(url, {
        method: "post",
        body: formData
      });
    request.then(resp => resp.json())
    .then(json => successcallback(json))
    .catch(error => errorcallback(error))
}

export default Request;