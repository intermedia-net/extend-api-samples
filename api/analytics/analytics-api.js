const baseUrl = 'https://api.intermedia.net';

// https://developer.intermedia.com/api/spec/analytics/index.html#post-/analytics/calls/call/detail
function getDetailedCalls(dateFrom, dateTo, timezone, sortColumn, descending, offset, size, accountId, body){
    let url = `${baseUrl}/analytics/calls/call/detail`;

    let searchParams = new URLSearchParams();

    searchParams.append("dateFrom", dateFrom + 'Z');
    searchParams.append("dateTo", dateTo + 'Z');
    if(timezone) searchParams.append("timezone", timezone);
    if(sortColumn) searchParams.append("sortColumn", sortColumn);
    if(descending) searchParams.append("descending", descending);
    if(offset) searchParams.append("offset", offset);
    if(size) searchParams.append("size", size);
    if(accountId) searchParams.append("accountId", accountId);

    url += `?${searchParams.toString()}`;

    return makeRequest("POST", url, body).then( response => response.json());
}

// https://developer.intermedia.com/api/spec/analytics/index.html#post-/analytics/calls/user
function getUserCalls(userIds, dateFrom, dateTo, accountId, timezone){ 
    let url = `${baseUrl}/analytics/calls/user`;

    let searchParams = new URLSearchParams();

    searchParams.append("dateFrom", dateFrom);
    searchParams.append("dateTo", dateTo);
    if(timezone) searchParams.append("timezone", timezone);
    if(accountId) searchParams.append("accountId", accountId);

    url += `?${searchParams.toString()}`;

    const body = {
        "userIds": userIds
    }

    return makeRequest("POST", url, body).then( response => response.json());
}

// https://developer.intermedia.com/api/spec/analytics/index.html#post-/analytics/calls/user/filters
function getUserFilters(dateFrom, dateTo, accountId, timezone){
    let url = `${baseUrl}/analytics/calls/user/filters`;

    let searchParams = new URLSearchParams();

    searchParams.append("dateFrom", dateFrom + 'Z');
    searchParams.append("dateTo", dateTo + 'Z');
    if(timezone) searchParams.append("timezone", timezone);
    if(accountId) searchParams.append("accountId", accountId);

    url += `?${searchParams.toString()}`;

    return makeRequest("POST", url).then( response => response.json());
}