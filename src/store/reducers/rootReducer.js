import {combineReducers} from 'redux'
import paymentReducer from './payment'
import authReducer from './auth'

export default combineReducers({
    payment: paymentReducer,
    auth: authReducer
})