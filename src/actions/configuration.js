import { get } from './../helpers/fetch';
import { getLocalStorage, setLocalStorage } from './../helpers/localStorage';

export const fetchConfig = (endpoint) => {
    return async(dispatch) => {
        try {
            const res = await get(endpoint);
            if ( !res ) throw Error;
            
            let resObj = {};
            await res.map(async(res) => {
                resObj = {...resObj, [res.category] : {
                    color: res.color,
                    description: res.description
                }}
            })
            await setLocalStorage('configuration', resObj);
            dispatch({
                type: 'NEW_CONFIG_DATA',
                payload: resObj
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}

export const fetchSpecificConfig = (endpoint) => {
    const service = endpoint.split('/').pop();
    return async(dispatch) => {
        try {
            const res = await get(endpoint);
            if ( !res ) throw Error;

            const local = await getLocalStorage('configuration')
            if (!local) setLocalStorage('configuration', { [service]: res })
            else setLocalStorage('configuration', {...local, [service] : res})

            dispatch({
                type: 'NEW_SPECIFIC_CONFIG_DATA',
                payload: {
                    key: service,
                    value: {
                        color: res.color,
                        description: res.description
                    }
                }
            })
        }
        catch(err) {
            console.log(err);
        }   
    }
}

		