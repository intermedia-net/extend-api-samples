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

document.getElementById('subscribe-hub').addEventListener("click", onSubscribeNotificationHub, false);

document.getElementById('get-devices').addEventListener("click", onGetDevices, false);

document.getElementById('make-call').addEventListener("click", onMakeCall, false);
document.getElementById('terminate-call').addEventListener("click", onTerminateCall, false);
document.getElementById('cancel-call').addEventListener("click", onCancelCall, false);
document.getElementById('transfer-call').addEventListener("click", onTransferCall, false);
document.getElementById('warm-transfer-call').addEventListener("click", onWarmTransferCall, false);

///////////////////////////////
// Rendering functions
///////////////////////////////
function createSelectElem(parentNode, elemId, dataList, valueParam, textParam) {
    //Create and append select list
    let selectList = document.createElement("select");
    selectList.id = elemId;
    parentNode.appendChild(selectList);

    //Create and append the options
    for (let i = 0; i < dataList.length; i++) {
        let option = document.createElement("option");
        option.value = dataList[i][valueParam];
        option.text = dataList[i][textParam];
        selectList.appendChild(option);
    }
}

function renderCallTableRow(eventType, callDirection, callId) {
    let allCallElems = document.getElementsByClassName("calls-table-row");

    for (let i = 0; i < allCallElems.length; i++) {
        if (allCallElems[i].classList.contains(callId)) {
            allCallElems[i].innerHTML = `<td>${eventType}</td><td>${callId}</td>`;
            return;
        }
    }

    let newCallElem = document.createElement("tr");
    newCallElem.className = `calls-table-row ${callId}`;
    newCallElem.innerHTML = `<td>${eventType}</td><td>${callId}</td>`;

    if (callDirection == "outgoing") {
        document.getElementById("outgoing-calls-table").appendChild(newCallElem);
    } else {
        document.getElementById("incoming-calls-table").appendChild(newCallElem);
    }
}

///////////////////////////////
// Device functions
///////////////////////////////
function onGetDevices() {
    getDevices().then((response) => {
        let devices = response["clickToCallDevices"];
        createSelectElem(document.getElementById("devices-wrapper"), "devices-select", devices, "id", "name");
    }).catch((error) => {
        log("Get devices failed! " + error);
    });
}

///////////////////////////////
// Call functions
///////////////////////////////
function onMakeCall() {
    let phoneNumber = document.getElementById('phone-number').value;
    let deviceId = document.getElementById('devices-select').value;

    makeCall(deviceId, phoneNumber, "placeCall").catch((error) => {
        log("Make call failed! " + error);
    });
}

function onTerminateCall() {
    let callId = document.getElementById("terminate-call-id").value;
    terminateCall(callId).catch((error) => {
        log("Terminate failed! " + error);
    });
}

function onCancelCall() {
    let callId = document.getElementById("cancel-call-id").value;
    cancelCall(callId, true).catch((error) => {
        log("Cancel failed! " + error);
    });
}

function onTransferCall() {
    let phoneNumber = document.getElementById('transfer-phone-number').value;
    let curCallId = document.getElementById("cur-call-id").value;
    transferCall(curCallId, phoneNumber).catch((error) => {
        log("Transfer failed! " + error);
    });
}

function onWarmTransferCall() {
    let callId1 = document.getElementById("warm-transfer-call-id-1").value;
    let callId2 = document.getElementById("warm-transfer-call-id-2").value;
    warmTransferCall(callId1, callId2).catch((error) => {
        log("Warm transfer failed! " + error);
    });
}

///////////////////////////////
// Notifications Hub
///////////////////////////////
function onSubscribeNotificationHub() {
    createHubSubscription().then((response) => {
        startHubConnection(response.deliveryMethod.uri);
    }).catch((error) => {
        log("Subscribe failed!" + error);
    });
}

function startHubConnection(deliveryMethodUri) {
    let connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Trace)
        .withUrl(deliveryMethodUri, {
            accessTokenFactory: () => getSessionToken()
        })
        .build();

    connection.on("OnEvent", data => {
        console.log(data);
        renderCallTableRow(data.eventType, data.callDirection, data.callId);
    });
    connection.on("OnCommandResult", data => {
        console.log(data);
    });

    // Start the connection.
    connection.start().then(() => console.log("connected")).catch(err => log(err));
}