///////////////////////////////
// on load
///////////////////////////////
if (!isAuthorized()) {
    window.location.href = "../../auth/pkce/auth.html"
}


//////////////////////////////
// UI event handlers
//////////////////////////////
document.getElementById('logout').addEventListener("click", () => logout(), false);

document.getElementById('start-meeting').addEventListener("click", onStartMeeting, false);
document.getElementById('get-user-details').addEventListener("click", onGetUserDetails, false);
document.getElementById('get-meeting-details').addEventListener("click", onGetMeetingDetails, false);

document.getElementById('clearLog').addEventListener("click", () => document.getElementById('out').innerHTML = '', false);

///////////////////////////////
// Meeting functions
///////////////////////////////
function onStartMeeting() {
    startMeeting().then((response) => {
        log(response);
    }).catch((error) => {
        log("Start meeting failed! " + error);
    });
}

function onGetUserDetails() {
    getUserDetails().then((response) => {
        log(response);
    }).catch((error) => {
        log("Start meeting failed! " + error);
    });
}

function onGetMeetingDetails() {
    let meetingCode = document.getElementById("meeting-code").value;

    getMeetingDetails(meetingCode).then((response) => {
        log(response);
    }).catch((error) => {
        log("Start meeting failed! " + error);
    });
}