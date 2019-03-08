import { post } from './../helpers/fetch';
import { setLocalStorage } from './../helpers/localStorage';

export const login = (payload) => {
    return async(dispatch) => {
        try {
            dispatch({ type: 'LOG_IN_ATTEMPT' })

            const res = await post('login', null, payload);
            if ( !res ) throw Error();

            await setLocalStorage('user', res)

            dispatch({
                type: 'LOG_IN_SUCCESS',
                payload: res
            })
        }
        catch(err) {
            dispatch({ type: 'LOG_IN_FAILED' })
        }
    }
}

export const logout = () => {
    return async(dispatch) => {

        const payload = {
            username: false,
            token: false,
            auth: false
        }

        await setLocalStorage('user', payload)

        dispatch({
            type: 'LOGOUT',
            payload
        })
    }
}