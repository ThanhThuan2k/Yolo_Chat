import { combineReducers } from 'redux';
import HomePageReducer from './Reducers/HomePageReducer';

export default combineReducers({
    HomePage: HomePageReducer,
});