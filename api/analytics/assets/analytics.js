///////////////////////////////
// on load
///////////////////////////////
if (!isAuthorized()) {
    window.location.href = "../../auth/s2s/auth.html"
}


//////////////////////////////
// UI event handlers
//////////////////////////////
document.getElementById('logout').addEventListener("click", () => logout(), false);

document.getElementById('getDetailedCalls').addEventListener("click", onGetDetailedCalls, false);

document.getElementById('getUserCalls').addEventListener("click", onGetUserCalls, false);

document.getElementById('getUserFilters').addEventListener("click", onGetUserFilters, false);

document.getElementById('clearLog').addEventListener("click", () => document.getElementById('out').innerHTML = '', false);

///////////////////////////////
// Analytics functions
///////////////////////////////
function onGetDetailedCalls() {
    let chargeable = document.getElementById('chargeable').value;
    let bound = document.getElementById('bound').value;
    let status = document.getElementById('status').value;
    let body = {};

    if (chargeable != 'select') {
        body['chargeable'] = [chargeable];
    }

    if (bound != 'select' && status != 'select') {
        body['callAttributes'] = [bound, status];
    }

    getDetailedCalls(
        document.getElementById('dateFromDetailedCalls').value,
        document.getElementById('dateToDetailedCalls').value,
        document.getElementById('timezone').value,
        document.getElementById('sortColumn').value,
        document.getElementById('descending').value,
        document.getElementById('offset').value,
        document.getElementById('getDetailedCallsSize').value,
        document.getElementById('getDetailedCallsAccountId').value,
        body ? body : null
    ).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get detailed calls failed! " + error);
    });
}

function onGetUserCalls() {
    const dateFrom = new Date(document.getElementById('dateFromUserCalls').value).toISOString();
    const dateTo = new Date(document.getElementById('dateToUserCalls').value).toISOString();
    const userIds = (document.getElementById('userIds').value).split(",");
    getUserCalls(
        userIds,
        dateFrom,
        dateTo,
        document.getElementById('getUserCallsTimezone').value,
        document.getElementById('getUserCallsAccountId').value
    ).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get user calls failed! " + error);
    });
}

function onGetUserFilters() {
    getUserFilters(
        document.getElementById('dateFromUserFilters').value,
        document.getElementById('dateToUserFilters').value,
        document.getElementById('getUserFiltersTimezone').value,
        document.getElementById('getUserFiltersAccountId').value
    ).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get user filters failed! " + error);
    });
}