///////////////////////////////
// on load
///////////////////////////////
if (!isAuthorized()) {
    window.location.href = "../../auth/pkce/auth.html"
}

const countOnList = 5; //amount on Voicemail list
let pageNumberOfVoicemails = 0;

//////////////////////////////
// UI event handlers
///////////////////////////////
document.getElementById('logout').addEventListener("click", () => logout(), false);

document.getElementById('buttonNext').addEventListener("click", () => {
    onGetVoiceMails(++pageNumberOfVoicemails * countOnList);
});

document.getElementById('buttonPrev').addEventListener("click", () => {
    onGetVoiceMails((pageNumberOfVoicemails > 0 ? --pageNumberOfVoicemails : pageNumberOfVoicemails) * countOnList);
});

document.getElementById('getVoiceMails').addEventListener("click", () => onGetVoiceMails(0), false);

document.getElementById('deleteVoiceMailRecords').addEventListener("click", onDeleteVoiceMailRecords, false);

document.getElementById('updateVoiceMailRecordsStatus').addEventListener("click", onUpdateVoiceMailRecordsStatus, false);

document.getElementById('getVoiceMailsTotal').addEventListener("click", onGetVoiceMailsTotal, false);

document.getElementById('getVoiceMailRecord').addEventListener("click", onGetVoiceMailRecord, false);

document.getElementById('clearLog').addEventListener("click", () => document.getElementById('out').innerHTML = '', false);

///////////////////////////////
// Rendering functions
///////////////////////////////
function createNewTr(tr) {
    let tableRow = document.createElement('tr');
    document.getElementById('table').appendChild(tableRow);

    let td = document.createElement('td');
    tableRow.appendChild(td);
    td.innerText = tr["id"];

    let td2 = document.createElement('td');
    tableRow.appendChild(td2);
    td2.innerText = tr["sender"]["phoneNumber"];

    let td3 = document.createElement('td');
    tableRow.appendChild(td3);
    td3.innerText = tr["sender"]["displayName"];

    let td4 = document.createElement('td');
    tableRow.appendChild(td4);
    td4.innerText = tr["status"];

    let td5 = document.createElement('td');
    tableRow.appendChild(td5);
    td5.innerText = tr["duration"];

    let td6 = document.createElement('td');
    tableRow.appendChild(td6);
    let date = new Date(tr["whenCreated"]);
    td6.innerText = date.getMonth() + 1 + '/' + date.getDay() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();

    let td7 = document.createElement('td');
    tableRow.appendChild(td7);
    td7.innerText = tr["hasText"];

    let td8 = document.createElement('td');
    tableRow.appendChild(td8);
    let button8 = document.createElement('button');
    button8.innerHTML = "Transcription";
    td8.appendChild(button8);
    button8.addEventListener("click", () => onGetVoiceMailsTranscription(tr["id"]), false);

    let td9 = document.createElement('td');
    tableRow.appendChild(td9);
    let oggButton = document.createElement('button');
    oggButton.innerHTML = "ogg";
    td9.appendChild(oggButton);
    oggButton.addEventListener("click", () => onGetVoiceMailsContent("ogg", tr["id"]), false);

    let mp3Button = document.createElement('button');
    mp3Button.innerHTML = "mp3";
    td9.appendChild(mp3Button);
    mp3Button.addEventListener("click", () => onGetVoiceMailsContent("mp3", tr["id"]), false);

    let td10 = document.createElement('td');
    tableRow.appendChild(td10);
    let button10 = document.createElement('button');
    button10.innerHTML = "Delete";
    td10.appendChild(button10);
    button10.addEventListener("click", () => onDeleteSelectedVoicemailRecords(tr["id"]), false);

    let td11 = document.createElement('td');
    tableRow.appendChild(td11);
    let button11 = document.createElement('button');
    button11.innerHTML = "Change Status";
    td11.appendChild(button11);
    button11.addEventListener("click", () => onUpdateSelectedVoiceMailRecordsStatus(tr["status"] == "read" ? "unread" : "read", tr["id"]), false);
}

function updateList(response) {
    let tableNode = document.getElementById("table");
    document.getElementById('buttonCurr').hidden = false;
    document.getElementById('thead').hidden = false;

    if (pageNumberOfVoicemails > 0) {
        document.getElementById('buttonPrev').hidden = false;
    } else {
        document.getElementById('buttonPrev').hidden = true;
    }

    if (response["records"].length == countOnList) {
        document.getElementById('buttonNext').hidden = false;
    } else {
        document.getElementById('buttonNext').hidden = true;
    }

    while (tableNode.childNodes.length > 2) {
        tableNode.removeChild(tableNode.lastChild);
    }

    for (let index = 0; index < response["records"].length; index++) {
        createNewTr(response["records"][index]);
    }

    document.getElementById('buttonCurr').innerHTML = pageNumberOfVoicemails + 1;
    document.getElementById('buttonPrev').innerHTML = pageNumberOfVoicemails;
    document.getElementById('buttonNext').innerHTML = pageNumberOfVoicemails + 2;
}

///////////////////////////////
// Voicemails functions
///////////////////////////////
function onGetVoiceMails(offset) {
    getVoiceMails(offset, countOnList).then((response) => {
        updateList(response);
    }).catch((error) => {
        log("Get voicemails failed! " + error);
    });
}

function onDeleteVoiceMailRecords() {
    let status = document.getElementById("deleteStatus").value;
    deleteVoiceMailRecords(status).then((response) => {
        onGetVoiceMails(pageNumberOfVoicemails * countOnList);
    }).catch((error) => {
        log("Delete voicemail records failed! " + error);
    });
}

function onDeleteSelectedVoicemailRecords(id) {
    deleteSelectedVoicemailRecords(id).then((response) => {
        onGetVoiceMails(pageNumberOfVoicemails * countOnList);
    }).catch((error) => {
        log("Delete selected voicemail records failed! " + error);
    });
}

function onUpdateVoiceMailRecordsStatus() {
    let status = document.getElementById("updateStatus").value
    updateVoiceMailRecordsStatus(status).then((response) => {
        onGetVoiceMails(pageNumberOfVoicemails * countOnList);
    }).catch((error) => {
        log("Update voicemail records status failed! " + error);
    });
}

function onUpdateSelectedVoiceMailRecordsStatus(status, ids) {
    updateSelectedVoiceMailRecordsStatus(status, ids).then((response) => {
        onGetVoiceMails(pageNumberOfVoicemails * countOnList);
    }).catch((error) => {
        log("Update selected voicemail records status failed! " + error);
    });
}

function onGetVoiceMailsTotal() {
    getVoiceMailsTotal(document.getElementById("totalStatus").value).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get voicemail total failed! " + error);
    });

}

function onGetVoiceMailRecord() {
    getVoiceMailRecord(document.getElementById("id").value).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get voicemail record failed! " + error);
    });
}

function onGetVoiceMailsTranscription(id) {
    getVoiceMailsTranscription(id).then((response) => {
        log(response["text"]);
    }).catch((error) => {
        log("Get voicemails transcription failed! " + error);
    });
}

function onGetVoiceMailsContent(format, id) {
    getVoiceMailsContent(format, id).then((response) => {
        let dataUrl = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = id + "." + format;
        a.click();
    }).catch((error) => {
        log("Get voicemails content failed! " + error);
    });


}