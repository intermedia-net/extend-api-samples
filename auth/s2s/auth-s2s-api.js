// https://developer.intermedia.com/api/spec/analytics/index.html#dev-guide-auth-guide
function getS2SAccessToken(clientId, clientSecret, scope, grantType = "client_credentials"){
    const url = 'https://login.intermedia.net/user/connect/token';
    let body = 
        'grant_type=' + grantType + 
        '&client_id=' + clientId + 
        '&client_secret=' + clientSecret;
    if(scope) body += '&scope=' + scope;

    return makeRequest("POST", url, body, "application/x-www-form-urlencoded").then((response) => response.json());
}