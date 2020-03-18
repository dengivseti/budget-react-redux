import React, { Component } from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {deletePayment, editPayment} from '../store/actions/payment'

class Edit extends Component {
    onSubmit = (payment) => {
        this.props.editPayment(this.props.payment.id, payment)
        this.props.history.push('/history')
    }

    onDelelete(event, id){
        event.preventDefault()
        this.props.deletePayment(id)
        this.props.history.push('/history')
    }

    componentDidMount() {
        if (this.props.firstStart || !this.props.payment){
            this.props.history.push('/history')
        }
    }

    getCategoryes = () => {
        if (!this.props.payment){
            return []
        }
        if (this.props.payment.type === 'expense') {
            return ['Продукты', 'Алкоголь', 'Развлечения', 'Здоровье', 'Транспорт', 'Магазины']
        }else {
            return ['Зарплата', 'Подработка']
        }
    }

    render() {
        return (
            <React.Fragment>
                <Form 
                    payment={{
                        ...this.props.payment,
                        categories: this.getCategoryes()
                    }}
                    onSubmit={this.onSubmit}
                />
                <div className="row justify-content-center">
                    <div className="col-md-3 mb-2">
                <button className="btn btn-danger btn-block" onClick={(e) => this.onDelelete(e, this.props.payment.id)}>Удалить</button>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        payments: state.payment.payments,
        loading: state.payment.loading,
        payment: state.payment.payments.find(payment => payment.id === props.match.params.id) || [],
        firstStart: state.auth.firstStart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deletePayment: (id) => dispatch(deletePayment(id)),
        editPayment: (id, payment) => dispatch(editPayment(id, payment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
