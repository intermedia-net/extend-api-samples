function getSessionToken(){
    return sessionStorage.getItem('pkceAccessToken');
}

function setSessionToken(accessToken){
    sessionStorage.setItem('pkceAccessToken', accessToken);
}

function isAuthorized(){
    return sessionStorage.getItem('pkceAccessToken') ? true : false;
}

function logout(){
    sessionStorage.removeItem('pkceAccessToken');
    window.location.reload();
}