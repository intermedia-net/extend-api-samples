function getSessionToken(){
    return sessionStorage.getItem('s2sAccessToken');
}

function setSessionToken(accessToken){
    sessionStorage.setItem('s2sAccessToken', accessToken);
}

function isAuthorized(){
    return sessionStorage.getItem('s2sAccessToken') ? true : false;
}

function logout(){
    sessionStorage.removeItem('s2sAccessToken');
    window.location.reload();
}