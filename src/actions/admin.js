import { del, post, update } from './../helpers/fetch';

export const adminAction = (method, endpoint, token, payload) => {
    return async(dispatch) => {
        try {
            let res;
            if ( method === 'delete' ) res = await del(endpoint, token);
            if ( method === 'post' ) res = await post(endpoint, token, payload)
            if ( method === 'update' ) res = await update(endpoint, token, payload)

            if ( !res ) throw Error();

            dispatch({
                type: "ADMIN_ACTION",
                payload: {
                    message: `Successfully ${method}d item`,
                    timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric", second: "numeric"})}`,
                    error: false
                }
            })

            return true;

        } 
        catch(err) {
            dispatch({
                type: "ADMIN_ACTION",
                payload: {
                    message: `Failed to ${method} item`,
                    timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric", second: "numeric"})}`,
                    error: true
                }
            })
            return false;
        }
    }
}

export const adminNotification = (timestamp) => {
    return (dispatch) => {
        dispatch({
            type: "ADMIN_REMOVE_NOTIFICATION",
            payload: timestamp
        })
    }
}