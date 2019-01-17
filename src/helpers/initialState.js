import { getLocalStorage } from './localStorage';

export const initialState = async () => {

    const configuration = await initialise('configuration');
    const services = await initialise('services');
    const contact = await initialise('contact');

    return {
        configuration,
        services,
        contact
    }
}

const initialise = async (key) => {
    return await getLocalStorage(key) ? await getLocalStorage(key) : {}
}