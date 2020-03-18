import { FETCH_PAYMENTS_START, FETCH_PAYMENTS_SUCCESS, ADD_PAYMENT, DELETE_PAYMENT, EDIT_PAYMENT } from "./actionTypes"
import axios from "axios"


const bdUrl = process.env.REACT_APP_BD_URL

export function fetchPayments() {
    return async dispatch =>{
        dispatch(fetchStart())
        const payments = []
        let total = 0
        let totalExpense = 0
        let totalRevenue = 0
        const response = await axios.get(`${bdUrl}/payments.json`)
        if (!response.data) {
            return dispatch(fetchPaymentsSuccess(payments, total, totalExpense, totalRevenue))
        }       
        Object.keys(response.data).forEach((key) => {
            payments.push({
                id: key,
                ...response.data[key]
            })
            if (response.data[key].type === 'expense') {
                totalExpense += response.data[key].amount
            }else{
                totalRevenue += response.data[key].amount
            }
        })
        total = totalRevenue - totalExpense
        dispatch(fetchPaymentsSuccess(payments, total, totalExpense, totalRevenue))
    }
} 

export function fetchPaymentsSuccess(payments, total, totalExpense, totalRevenue) {
    return {
        type: FETCH_PAYMENTS_SUCCESS,
        payments, total, totalExpense, totalRevenue
    }
}


export function addPayment(payment) {
    return async dispatch => {
        try {
            const response = await axios.post(`${bdUrl}/payments.json`, payment)
            const payload = {
                ...payment,
                id: response.data.name
            }
            return dispatch({
                type: ADD_PAYMENT,
                payload
            })
        } catch (e) {
            console.log(e)
        }
    } 
}

export function deletePayment(id) {
    return async dispatch => {
        try {
            await axios.delete(`${bdUrl}/payments/${id}.json`)
            return dispatch({
                type: DELETE_PAYMENT,
                id
            })
        } catch (e) {
            console.log(e)
        }
    } 
}

export function editPayment(id, payment) {
    return async (dispatch, getState) => {
        try {
            await axios.patch(`${bdUrl}/payments/${id}.json`, payment)
            const oldPayments = getState().payment.payments
            const payments = oldPayments.filter(payment => payment.id !== id)
            payment['id'] = id
            payments.push(payment)
            dispatch({
                type: EDIT_PAYMENT,
                payments
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchStart() {
    return {
        type: FETCH_PAYMENTS_START
    }
}
