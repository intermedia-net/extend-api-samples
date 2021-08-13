///////////////////////////////
// IIFE on load (get access token)
///////////////////////////////
(() => {
    if (isAuthorized()) {
        window.location.href = "api-menu.html";
    }

    Oidc.Log.logger = console;
    Oidc.Log.level = Oidc.Log.DEBUG;
    console.log("Using oidc-client version: ", Oidc.Version);

    let settings = {
        authority: localStorage.getItem('cfg-authority'),
        client_id: localStorage.getItem('cfg-clientId'),
        redirect_uri: location.href.split('?')[0],
        response_type: 'code',
        scope: localStorage.getItem('cfg-scopes'),

        automaticSilentRenew: false,
        validateSubOnSilentRenew: false,

        monitorAnonymousSession: false,
        filterProtocolClaims: false,
        monitorSession: false,
        loadUserInfo: false,
        revokeAccessTokenOnSignout: true,

        extraTokenParams: {
            acr_values: localStorage.getItem('cfg-acr')
        },

        extraQueryParams: {
            login_hint: localStorage.getItem('cfg-login'),
        }
    };

    getAccessToken(settings).then((response) => {
        setSessionToken(response);
        window.location.href = "api-menu.html";
    }).catch((error) => {
        log(error);
    });
})();