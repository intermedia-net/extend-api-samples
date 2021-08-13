///////////////////////////////
// on load 
///////////////////////////////
if(isAuthorized()){
    window.location.href = "api-menu.html";
}

///////////////////////////////
// UI event handlers
///////////////////////////////
document.getElementById('authorization').addEventListener("click", onAuthorizationS2S, false);

///////////////////////////////
// Auth
///////////////////////////////
function onAuthorizationS2S(){
    let clientId = document.getElementById("client-id").value;
    let clientSecret = document.getElementById("client-secret").value;
    let scope = document.getElementById("scope").value;
    getS2SAccessToken(clientId, clientSecret, scope).then((response) => {
        setSessionToken(response["access_token"]);
        window.location.href = 'api-menu.html';
    }).catch((error) => {
        console.log("Error!!! " + error);
    });
}