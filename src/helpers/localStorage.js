export const getLocalStorage = async (key, x) => {
    try {
        let local = await localStorage.getItem(key);
        if ( local === null ) throw Error;
        return JSON.parse(local);
    }
    catch(err) {
        return false;
    }
}

export const setLocalStorage = async (key, value) => {
    try {
        let local = await getLocalStorage(key);
        if ( !local ) throw Error;

        await localStorage.removeItem(key);
        await localStorage.setItem(key, JSON.stringify(value));
    }
    catch(err) {
        return await localStorage.setItem(key, JSON.stringify(value));
    }
}

export const nestLocalStorage = async (key, innerKey, value) => {
    
}