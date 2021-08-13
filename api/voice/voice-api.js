const baseUrl = 'https://api.intermedia.net';

///////////////////////////////
// Notification hub
///////////////////////////////

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/subscriptions
function createHubSubscription(events = ["*"], ttl = "00:30:00"){
    const url = `${baseUrl}/voice/v2/subscriptions`;
    const body = {
        "events": events,
        "ttl": ttl
    };

    return makeRequest('POST', url, body).then((response) => response.json());
}

///////////////////////////////
// Devices
///////////////////////////////

// https://developer.intermedia.com/api/spec/calling/index.html#get-/devices
function getDevices(){
    const url = `${baseUrl}/voice/v2/devices`;
    
    return makeRequest("GET", url).then((response) => response.json());
}

///////////////////////////////
// Calls
///////////////////////////////

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/calls
function makeCall(deviceId, phoneNumber, mode = "placeCall", callId, commandId){
    const url = `${baseUrl}/voice/v2/calls`;
    let body = {
        "deviceId": deviceId,
        "mode": mode,
        "phoneNumber": phoneNumber
    };
    if(callId) body.callId = callId;
    if(commandId) body.commandId = commandId;

    return makeRequest('POST', url, body).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#delete-/voice/v2/calls/{callId}
function terminateCall(callId, commandId){
    const url = `${baseUrl}/voice/v2/calls/${callId}` +
        (commandId ? `/commandId=${commandId}`: ``);

    return makeRequest('DELETE', url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/calls/{callId}/cancel
function cancelCall(callId, skipToVoiceMail = true, commandId){
    const url = `${baseUrl}/voice/v2/calls/${callId}/cancel`;
    let body = {
        "skipToVoiceMail": skipToVoiceMail
    };
    if(commandId) body.commandId = commandId;

    return makeRequest('POST', url, body).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/calls/{callId}/transfer
function transferCall(callId, phoneNumber, commandId){
    const url = `${baseUrl}/voice/v2/calls/${callId}/transfer`;
    let body = {
        "phoneNumber": phoneNumber
    };
    if(commandId) body.commandId = commandId;

    return makeRequest('POST', url, body).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/calls/{callId}/merge
function warmTransferCall(callId1, callId2, commandId){
    const url = `${baseUrl}/voice/v2/calls/${callId1}/merge`;
    let body = {
        "mergeCallId": callId2
    };
    if(commandId) body.commandId = commandId;

    return makeRequest('POST', url, body).then((response) => response.json());
}

function getCallRecs(organizationId, unifiedUserId, offset = 0, count = 100){
    const url = `${baseUrl}/voice/v2/organizations/${organizationId}/users/${unifiedUserId}/call-recordings?offset=${offset}&count=${count}`;
    return makeRequest("GET", url).then((response) => response.json());
}

function getCallRecsArchive(organizationId, unifiedUserId, ids, format = "zip"){
    const url = `${baseUrl}/voice/v2/organizations/${organizationId}/users/${unifiedUserId}/call-recordings/_selected/_content?format=${format}`;
    const body = {
        "ids": ids,
    };

    return makeRequest("POST", url, body).then((response) => response.arrayBuffer());
}

function getCallRecsContent(organizationId, unifiedUserId, callRecId){
    const url = `${baseUrl}/voice/v2/organizations/${organizationId}/users/${unifiedUserId}/call-recordings/${callRecId}/_content`;
    return makeRequest("GET", url).then((response) => response.arrayBuffer());
}

///////////////////////////////
// Voicemails
///////////////////////////////

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/voicemails
function getVoiceMails(offset, countOnList){ 
    const url = `${baseUrl}/voice/v2/voicemails?offset=${offset}&count=${countOnList}`;

    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#delete-/voice/v2/voicemails/_all
function deleteVoiceMailRecords(status){
    const url = `${baseUrl}/voice/v2/voicemails/_all?status=${status}`;
    return makeRequest("DELETE", url).then((response) => response);
}

// https://developer.intermedia.com/api/spec/calling/index.html#delete-/voice/v2/voicemails/_selected
function deleteSelectedVoicemailRecords(ids){
    const url = `${baseUrl}/voice/v2/voicemails/_selected`;
    const body = { 
        "ids": [ids] 
    };

    return makeRequest("DELETE", url, body).then((response) => response);
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/voicemails/_all/_metadata
function updateVoiceMailRecordsStatus(status){
    const url = `${baseUrl}/voice/v2/voicemails/_all/_metadata`;
    const body = { 
        "status": status 
    };

    return makeRequest("POST", url, body).then((response) => response);
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/voicemails/_selected/_metadata
function updateSelectedVoiceMailRecordsStatus(status, ids){
    const url = `${baseUrl}/voice/v2/voicemails/_selected/_metadata`;
    const body = { 
        "ids": [ids],
        "status": status
    };

    return makeRequest("POST", url, body).then((response) => response);
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/voicemails/_total
function getVoiceMailsTotal(status){
    const url = `${baseUrl}/voice/v2/voicemails/_total?status=${status}`;

    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/voicemails/{id}
function getVoiceMailRecord(id){
    const url = `${baseUrl}/voice/v2/voicemails/${id}`;

    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/voicemails/{id}/_transcript
function getVoiceMailsTranscription(id){
    const url = `${baseUrl}/voice/v2/voicemails/${id}/_transcript`;
   
    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/voicemails/{id}/_content
function getVoiceMailsContent(format, id){
    const url = `${baseUrl}/voice/v2/voicemails/${id}/_content?format=${format}`;

    return makeRequest("GET", url).then(response => response.blob());
}

///////////////////////////////
// Voicemails Settings
///////////////////////////////

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/users/_me/voicemail/greeting
function getGreetingContent(format, custom){ 
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/greeting?format=${format}&custom=${custom}`;

    return makeRequest("GET", url)
        .then(res => res.ok ? res : Promise.reject("Custom greeting is not found"))
        .then(response => response.blob());
}

// https://developer.intermedia.com/api/spec/calling/index.html#delete-/voice/v2/users/_me/voicemail/greeting
function resetGreetingContent(){
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/greeting`;

    return makeRequest("DELETE", url).then( (response) => res = response);        
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/users/_me/voicemail/settings
function updateUserSettings(pin, hasCustomGreeting, isTranscriptionPermitted, enableTranscription, receiveEmailNotifications, emails, includeVoiceMail){
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/settings`;
    const body = {
        "pin": pin,
        "hasCustomGreeting": hasCustomGreeting,
        "isTranscriptionPermitted": isTranscriptionPermitted,
        "enableTranscription": enableTranscription,
        "receiveEmailNotifications": receiveEmailNotifications,
        "emails": [emails],
        "includeVoiceMail": includeVoiceMail
    }

    return makeRequest("POST", url, body).then( (response) => res = response );   
}

// https://developer.intermedia.com/api/spec/calling/index.html#post-/voice/v2/users/_me/voicemail/greeting
function uploadGreetingContent(){ 
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/greeting`;
    let formData = new FormData();

    const selectedFile = document.getElementById('greetingFile').files[0];
    formData.append("greetingFile", selectedFile);    

    return makeRequest("POST", url, formData, undefined, true)
        .then(response => response.ok ? response : Promise.reject("Something goes wrong"));
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/users/_me/voicemail/settings
function getUserSettings(){
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/settings`;

    return makeRequest("GET", url).then( response => response.json());
}

// https://developer.intermedia.com/api/spec/calling/index.html#get-/voice/v2/users/_me/voicemail/usage
function getVoicemailUsage(){
    const url = `${baseUrl}/voice/v2/users/_me/voicemail/usage`;

    return makeRequest("GET", url).then( response => response.json());
}