import React, { Component } from 'react'
import {toCurrency} from '../utils/money'
import {toDate} from '../utils/toDate'
import { connect } from 'react-redux'
import {fetchPayments, deletePayment} from '../store/actions/payment'
import {NavLink} from 'react-router-dom'

class History extends Component {

    onRemove = (e, id) => {
        e.preventDefault()
        this.props.deletePayment(id)

    }

    // onEdit = (id) => {
    //     console.log('Редактировать', id)
    //     this.props.history.push(`/edit/${id}`)
    // }

    generateList = () => {
        return this.props.payments
            .sort(function(a, b){
                return  new Date(b.createdAt) - new Date(a.createdAt)
            })
            .map(payment =>{
            return (
                <NavLink 
                    to={`/edit/${payment.id}`}
                    className={`list-group-item ${payment.type}`}
                    key={payment.id}
                >
                    <div className="row">
                        <div className="col" >{payment.category}</div>
                        <div className="col">{toCurrency(payment.amount)}</div>
                        <div className="col-md-auto">
                            <small>{toDate(payment.createdAt)}</small>
                        </div>
                        <div className="col col-lg-1">
                            <button type="button" className="close" onClick={(e) => this.onRemove(e, payment.id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    
                    
                </NavLink>
            )
        })
    }

    render() {
        return (
            <div className="row justify-content-center mt-2">
                <ul className="list-group">
                    {this.generateList()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        payments: state.payment.payments,
        loading: state.payment.loading,
        createdAt: new Date(state.payment.createdAt),
        total: state.payment.total,
        totalExpense: state.payment.totalExpense,
        totalRevenue: state.payment.totalRevenue
    }
}

function mapDispatchToProps(dispatch) { 
    return{
        fetchPayments: () => dispatch(fetchPayments()),
        deletePayment: (id) => dispatch(deletePayment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
