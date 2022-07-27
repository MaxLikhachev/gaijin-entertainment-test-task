const URL = 'http://127.0.0.1:8000'

export const readSongs = async (set = console.log, url = URL + '/songs/') => await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
}).then(response => response.json()).then(set);

export const createSong = async (data = null, url = URL + '/songs/') => await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(console.log);

export const deleteSong = async (data = null, url = URL + '/songs/') => await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(console.log);

export const updateSong = async (data = null, url = URL + '/songs/') => await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(console.log);