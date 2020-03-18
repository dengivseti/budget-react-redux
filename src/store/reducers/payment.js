import {FETCH_PAYMENTS_START, FETCH_PAYMENTS_SUCCESS, ADD_PAYMENT, DELETE_PAYMENT, EDIT_PAYMENT } from '../actions/actionTypes'

const initialState = {
    payments: [],
    loading: false,
    total: 0,
    totalExpense: 0,
    totalRevenue: 0
}

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PAYMENTS_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_PAYMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: action.payments,
                total: action.total, 
                totalExpense: action.totalExpense,
                totalRevenue: action.totalRevenue
            }
        case ADD_PAYMENT:
            return {
                ...state,
                payments: [...state.payments, action.payload]
            }
        case DELETE_PAYMENT:
            return {
                ...state,
                payments: state.payments.filter(payment => payment.id !== action.id)
            }
        case EDIT_PAYMENT:
            return {
                ...state,
                payments: [...action.payments]
            }
        default:
            return state
    }
}