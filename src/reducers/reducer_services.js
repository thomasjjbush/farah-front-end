export default function(state = {}, action) {
    switch ( action.type ) {
        case "NEW_SERVICES":
            return {...state, [action.payload.key] : action.payload.value}

        default: 
            return state
    }
}