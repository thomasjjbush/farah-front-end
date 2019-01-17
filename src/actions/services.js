import { get } from './../helpers/fetch';
import { getLocalStorage, setLocalStorage } from './../helpers/localStorage';

export const fetchServices = (endpoint) => {
    return async(dispatch) => {
        const service = endpoint.split('/').pop();
        try {
            let res = await get(endpoint);
            if ( !res ) throw Error;

            // mutate response
            res = await arrangeServices(res);

            const local = await getLocalStorage('services')
            if (!local) setLocalStorage('services', { [service]: res })
            else setLocalStorage('services', {...local, [service] : res})
    
            dispatch({
                type: 'NEW_SERVICES',
                payload: {
                    key: service,
                    value: res
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }
}




const arrangeServices = async (res) => {
    return new Promise((resolve) => {
        let services = {};
        for ( var i = 0; i < res.length; i++ ) {
            // const TEST = res[i].sub
            if ( !services.hasOwnProperty(res[i].subCategory) ) {
                services = {...services, [res[i].subCategory]: [res[i]]};
            } else services = {...services, [res[i].subCategory]: [...services[res[i].subCategory], res[i]]}
        }
        resolve(services);
    })
}



		

		