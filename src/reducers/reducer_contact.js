const initialState = { loading : true }
export default function(state = initialState, action) {
    switch ( action.type ) {
        case "CASESTUDY_REQUEST":
            return state

        case "CASESTUDY_RESPONSE":
            return Object.assign({}, state, {loading: false}, {content: action.payload})

        case "UNPOPULATE_DATA":
            return Object.assign({}, state, {loading: true}, {content: action.payload})

        default: 
            return state
    }
}