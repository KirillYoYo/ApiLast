import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import transactions from './addTransaction';
import banks from './banks';
import goods from './goods';

const rootReducer = combineReducers({
	auth,
	menu,
});

export default rootReducer;
