// https://developer.intermedia.com/api/spec/calling/index.html#dev-guide-auth-guide
function getAccessToken(settings) {
    return new Promise((succeed, fail) => {
        const mgr = new Oidc.UserManager(settings);

        //check for token in URL
        if (location.search.includes("code=", 1)) {
            //Response code was found in query. Trying to exchange code for token...
            mgr.signinCallback(settings).then((user) => {
                succeed(user.access_token);
            }).catch((err) => {
                log(err);
                fail(new Error("Exchange code for token failed!:" + err));
            });
        } else { //go authorization
            log("Going to sign in using following configuration");

            mgr.signinRedirect({ useReplaceToNavigate: true }).then(() => {
                log("Redirecting to AdSTS...");
            }).catch((err) => {
                fail(new Error("Redirecting to AdSTS failed! \n" + err));
            });
        }
    });
}