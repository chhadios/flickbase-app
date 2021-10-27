import { combineReducers } from "redux";
import articles from './articles_reducer';
import users from './user_reducer';
import site from './site_reducer';
import notification from './notifications_reducer';

const appReducers=combineReducers({
    articles,
    users,
    site,
    notification
})

export default appReducers;