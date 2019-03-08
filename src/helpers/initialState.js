import { getLocalStorage } from './localStorage';
import { get } from './fetch';

export const initialState = async () => {

    const configuration = await initialise('configuration');
    const services = await initialise('services');
    const contact = await initialise('contact');
    const user = await initialiseUser('user');

    return {
        configuration,
        services,
        contact,
        user
    }
}

const initialise = async (key) => {
    return await getLocalStorage(key) ? await getLocalStorage(key) : {}
}

const initialiseUser = async () => {
    const user = await getLocalStorage('user');
    if ( user.token ) {
       const auth = await get('login', user.token);
       return {...user, auth}
    }
}