import { combineReducers } from 'redux';

import students from './students';
import users from './users';

const rootReducer = combineReducers({
    students,
    users
});

export default rootReducer;