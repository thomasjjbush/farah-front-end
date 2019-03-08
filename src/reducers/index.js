import { combineReducers } from 'redux';
import Configuration from './reducer_configuration';
import Services from './reducer_services';
import Contact from './reducer_contact';
import User from './reducer_user';
import Admin from './reducer_admin';

const rootReducer = combineReducers({
    configuration: Configuration,
    services: Services,
    contact: Contact,
    user: User,
    admin: Admin
})

export default rootReducer;