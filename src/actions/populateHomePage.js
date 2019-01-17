import axios from 'axios';

export function populateHomePage() {
    return function action(dispatch) {
        dispatch({
            type: "HOMEPAGE_REQUESTED"
        })
        const request = axios.all([
            axios.get("http://0.0.0.0:3008/case-studies/featured"),
            axios.get("http://0.0.0.0:3008/services"),
            axios.get("http://0.0.0.0:3008/case-study-categories")
        ]);
        request.then((response) => {
            let payload = [ // data is initially set to null
                { name: "featured", data: null },
                { name: "services", data: null },
                { name: "categories", data: null }
            ]
            for ( var i = 0; i < response.length; i++ ) {
                if ( response[i].data.success ) { // if there is data update payload.data (otherwise it will remain as null)
                    payload[i].data = response[i].data.response
                }
            }
            return dispatch({
                type: "HOMEPAGE_RESPONCE",
                payload: payload // all data is returned (included null values)
            })
        }).catch((err) => {
            return dispatch({
                type: "HOMEPAGE_RESPONCE",
                payload: null // if there is an error
            })
        });
    }
}
