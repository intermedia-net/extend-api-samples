function makeRequest(method, url, body, reqContentType = "application/json", isSendFile = false){
    let options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${getSessionToken()}`
        }
    };

    if(body){
        if(isSendFile == false){
            options["headers"]["Content-Type"] = reqContentType;
            if(typeof body != 'string') 
                body = JSON.stringify(body);
        }
        options["body"] = body;
    }

    return fetch(url, options);
}
