import { api, headers } from './../const';

export const get = async (endpoint) => {
    const res = await fetch(`${api}/${endpoint}`, {
        method: 'GET'
    })
    return res.json();
}

export const update = async (endpoint, method, payload) => {
    try {
        const res = await fetch(`${api}/${endpoint}`, {
            method: method,
            headers: headers,
            body: JSON.stringify(payload)
        })
        if ( !res.status === '200' ) throw Error;

        return true
    }
    catch(err) {
        return false
    }
}