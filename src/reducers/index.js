import { combineReducers } from 'redux';
import Configuration from './reducer_configuration';
import Services from './reducer_services';
import Contact from './reducer_contact';

const rootReducer = combineReducers({
    configuration: Configuration,
    services: Services,
    contact: Contact
})

export default rootReducer;