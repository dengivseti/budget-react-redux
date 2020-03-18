import React, { Component } from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import { addPayment } from '../store/actions/payment'

const categories = ['Зарплата', 'Подработка']

class AddRevenue extends Component {
    onSubmit = (value) => {
        this.props.addPayment(value)
        this.props.history.push('/history')
    }

    render() {
        return (
            <Form 
                payment={{
                    type: 'revenue',
                    categories
                }}
                onSubmit={this.onSubmit}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPayment: (payment) => dispatch(addPayment(payment))
    }
}

export default connect(null, mapDispatchToProps)(AddRevenue)