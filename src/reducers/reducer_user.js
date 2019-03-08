export default function(state = {}, action) {
    switch ( action.type ) {
        case "LOG_IN_ATTEMPT":
            return {...state}

        case "LOG_IN_SUCCESS":
            return {...state, ...action.payload}

        case "LOG_IN_FAILED":
            return {...state, ...action.payload }

        case "LOGOUT":
            return {...state, ...action.payload}
        
        default: 
            return state
    }
}