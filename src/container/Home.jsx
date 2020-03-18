import React, { Component } from 'react'
import {Info} from '../components/Info'
import {connect} from 'react-redux'
import {fetchPayments} from '../store/actions/payment'

class Home extends Component {
    async componentDidMount(){
        await this.props.fetchPayments()
    }

    render() {
        return (
            <div>
                <Info 
                    total={this.props.total}
                    totalExpense={this.props.totalExpense}
                    totalRevenue={this.props.totalRevenue}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        payments: state.payment.payments,
        loading: state.payment.loading,
        total: state.payment.total,
        totalExpense: state.payment.totalExpense,
        totalRevenue: state.payment.totalRevenue
    }
}

function mapDispatchToProps(dispatch) { 
    return{
        fetchPayments: () => dispatch(fetchPayments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)