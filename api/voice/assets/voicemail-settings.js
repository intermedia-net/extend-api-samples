///////////////////////////////
// on load
///////////////////////////////
if (!isAuthorized()) {
    window.location.href = "../../auth/pkce/auth.html"
}

//////////////////////////////
// UI event handlers
///////////////////////////////
document.getElementById('logout').addEventListener("click", () => logout(), false);

document.getElementById('getDefaultGreetingContentMp3').addEventListener("click", () =>
    onGetGreetingContent("mp3", 0), false);

document.getElementById('getDefaultGreetingContentOgg').addEventListener("click", () =>
    onGetGreetingContent("ogg", 0), false);

document.getElementById('getCustomGreetingContentMp3').addEventListener("click", () =>
    onGetGreetingContent("mp3", 1), false);

document.getElementById('getCustomGreetingContentOgg').addEventListener("click", () =>
    onGetGreetingContent("ogg", 1), false);

document.getElementById('uploadGreetingContent').addEventListener("click", onUploadGreetingContent, false);

document.getElementById('getUserSettings').addEventListener("click", onGetUserSettings, false);

document.getElementById('getVoicemailUsage').addEventListener("click", onGetVoicemailUsage, false);

document.getElementById('resetGreetingContent').addEventListener("click", onResetGreetingContent, false);

document.getElementById('updateUserSettings').addEventListener("click", onUpdateUserSettings, false);

document.getElementById('clearLog').addEventListener("click", () => document.getElementById('out').innerHTML = '', false);

///////////////////////////////
// Voicemail settings functions
///////////////////////////////
function onGetGreetingContent(format, custom) {
    getGreetingContent(format, custom).then((response) => {
        let dataUrl = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'greeting.' + format;
        a.click();
    }).catch((error) => {
        log("Get greeting content failed! " + error);
    });

}

function onUploadGreetingContent() {
    uploadGreetingContent().then((response) => {
        log(response);
    }).catch((error) => {
        log("Upload greeting content failed! " + error);
    });
}

function onGetUserSettings() {
    getUserSettings().then((response) => {
        log(response);
    }).catch((error) => {
        log("Get user settings failed! " + error);
    });
}

function onUpdateUserSettings() {
    updateUserSettings(
        document.getElementById("pin").value,
        document.getElementById("hasCustomGreeting").value,
        document.getElementById("isTranscriptionPermitted").value,
        document.getElementById("enableTranscription").value,
        document.getElementById("receiveEmailNotifications").value,
        document.getElementById("emails").value,
        document.getElementById("includeVoiceMail").value
    ).then((response) => {
        log(response);
    }).catch((error) => {
        log("Update user settings failed! " + error);
    });
}

function onGetVoicemailUsage() {
    getVoicemailUsage().then((response) => {
        log(response);
    }).catch((error) => {
        log("Get voicemail usage failed! " + error);
    });
}

function onResetGreetingContent() {
    resetGreetingContent().then((response) => {
        log(response);
    }).catch((error) => {
        log("Reset greeting content failed! " + error);
    });
}