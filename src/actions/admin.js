import { put } from './../helpers/fetch';

export const postNewConfigData = (endpoint, payload) => {
    return async (dispatch) => {
       const test = await put(endpoint, payload)
       console.log(test)
    }
}