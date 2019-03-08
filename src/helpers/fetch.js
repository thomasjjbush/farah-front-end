import { api, headers } from './../const';

export const get = async (endpoint, token) => {
    try {
        let res = await fetch(`${api}/${endpoint}`, {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })

        if ( res.status !== 200 ) throw Error;
        
        res = await res.json();
        return res;
    }
    catch(err) {
        return false
    }
}

export const update = async (endpoint, token, payload) => {
    try {
        const res = await fetch(`${api}/${endpoint}`, {
            method: 'PUT',
            headers: {...headers, 'x-access-token': token},
            body: JSON.stringify(payload)
        })
        if ( res.status !== 200 ) throw Error;

        return true;
    }
    catch(err) {
        return false;
    }
}

export const del = async (endpoint, token) => {
    try {
        const res = await fetch(`${api}/${endpoint}`, {
            method: 'DELETE',
            headers: {...headers, 'x-access-token': token}
        })
        if ( res.status !== 200 ) throw Error;

        return true;
    }
    catch(err) {
        return false;
    }
}

export const post = async (endpoint, token, payload) => {
    try {
        let res = await fetch(`${api}/${endpoint}`, {
            method: 'POST',
            headers: {...headers, 'x-access-token': token},
            body: JSON.stringify(payload)
        })
        if ( res.status !== 200 ) throw Error();

        const read = await res.json()
        return read
    }
    catch(err) {
        return false;
    }
}