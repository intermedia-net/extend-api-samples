const baseUrl = 'https://api.intermedia.net';

// https://developer.intermedia.com/api/spec/address_book/index.html#get-/address-book/v3/contacts
function getContacts(query, phone, scope, fields){ 
    let url = `${baseUrl}/address-book/v3/contacts`;

    let searchParams = new URLSearchParams();
    if(query) searchParams.append("query", query);
    if(phone) searchParams.append("phone", phone);
    if(scope) searchParams.append("scope", scope);
    if(fields) searchParams.append("fields", fields);

    if(searchParams.toString()){
        url += `?${searchParams.toString()}`;
    }
       
    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/address_book/index.html#get-/address-book/v3/contacts/_me
function getUserDetails(fields){ 
    let url = `${baseUrl}/address-book/v3/contacts/_me`;

    if(fields){
        url += `?${fields}`;
    }

    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/address_book/index.html#post-/address-book/v3/contacts/_search
function getContactsByJIDs(jids, fields){ 
    let url = `${baseUrl}/address-book/v3/contacts/_search`;

    if(fields){
        url += `?${fields}`;
    }

    const body = {
        "jids" : jids
    }

    return makeRequest("POST", url, body).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/address_book/index.html#get-/address-book/v3/contacts/{id}
function getSingleContact(id, fields){ 
    let url = `${baseUrl}/address-book/v3/contacts/${id}`;

    if(fields){
        url += `?${fields}`;
    }

    return makeRequest("GET", url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/address_book/index.html#get-/address-book/v3/avatars/{avatarId}
function getAvatar(avatarId){
    const url = `${baseUrl}/address-book/v3/avatars/${avatarId}`;

    return makeRequest('GET', url).then((response) => response.json());
}

// https://developer.intermedia.com/api/spec/address_book/index.html#post-/address-book/v3/avatars/_search
function getMultipleAvatars(avatarIds){
    const url = `${baseUrl}/address-book/v3/avatars/_search`;
    const body = {
        "avatarIds": avatarIds,
    };
    return makeRequest('POST', url, body).then((response) => response.json());
}


