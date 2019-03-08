export default function(state = [], action) {
    switch ( action.type ) {
        case "ADMIN_ACTION":
            return [...state, action.payload]

        case "ADMIN_REMOVE_NOTIFICATION":
            return state.filter(item => item.timestamp !== action.payload)

        default: 
            return state
    }
}