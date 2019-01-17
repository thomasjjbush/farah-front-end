import axios from 'axios';

export function populateCaseStudy(slug) {
    return function action(dispatch) {
        dispatch({ 
            type: "CASESTUDY_REQUEST"
        })
        const request = axios({
            method: 'GET',
            url: `http://0.0.0.0:3008/case-studies/1/${slug}`,
            headers: []
        });
        request.then((response) => {
            let payload = null; // data is initially set to null
            if ( response.data.success ) { // update payload if data exists
                payload = response.data.response
            }
            return dispatch({
                type: "CASESTUDY_RESPONSE",
                payload: payload // data is returned (even if its value is null)
            })
        }).catch((err) => {
            console.log(err)
            dispatch({
                type: "CASESTUDY_RESPONSE",
                payload: null // if there is an error
            })
        });
    }
}

		