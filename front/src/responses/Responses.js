const URL = 'http://127.0.0.1:8000'

export const getSongs = async (set = console.log, url = URL + '/songs/') => await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
}).then(response => response.json()).then(set);

export const setSong = async (data = null, url = URL + '/songs/') => await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(console.log);

// export const dispatch = (request, set, data) => request(data).then(set).catch(console.debug);