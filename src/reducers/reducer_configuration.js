export default function(state = {}, action) {
    switch ( action.type ) {
        case "NEW_CONFIG_DATA":
            return action.payload

        case "NEW_SPECIFIC_CONFIG_DATA":
            return {...state, [action.payload.key] : action.payload.value}

        default: 
            return state
    }
}