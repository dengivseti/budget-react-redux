import React, { Component } from 'react'
import { Switch, Route, Redirect, Router} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import Home from './container/Home'
import History from './container/History'
import AddExpense from './components/AddExpense'
import AddRevenue from './components/AddRevenue'
import Edit from './components/Edit'
import {connect} from 'react-redux'
import { firstStart } from './store/actions/auth'
import {fetchPayments} from './store/actions/payment'

const createHistory = require('history').createBrowserHistory


const history = createHistory()

class App extends Component {
    componentDidMount() {
        if(this.props.firstStart) {
            this.props.updateStart()
            this.props.fetchPayments()
        }
    }

    render() {
        return (
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route path="/add/expense" component={AddExpense} />
                    <Route path="/add/revenue" component={AddRevenue} />
                    <Route path="/edit/:id" component={Edit} />
                    <Route path="/history" component={History} />
                    <Route exact path="/" component={Home} />
                    <Redirect to='/' />
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        firstStart: state.auth.firstStart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateStart: () => dispatch(firstStart()),
        fetchPayments: () => dispatch(fetchPayments())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)