import React from 'react'
import {NavLink} from 'react-router-dom'
import { toCurrency } from '../utils/money'

export const Info = props => {

    return (
        <div className="card">
        <div className="card-header">
            В этом месяце
        </div>
        <div className="card-body">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Баланс</h5>
                    <hr/>
                    <p className="card-text">{toCurrency(props.total)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 mt-2">
                    <div className="card text-center">
                    <div className="card-body expense">
                        <h5 className="card-title">Потрачено</h5>
                        <hr/>
                        <p className="card-text">{toCurrency(props.totalExpense)}</p>
                        <NavLink className="btn btn-danger btn-block" to='/add/expense'>Добавить расходы</NavLink>
                    </div>
                    </div>
                </div>

                <div className="col-sm-6 mt-2">
                    <div className="card text-center revenue">
                    <div className="card-body">
                        <h5 className="card-title">Заработано</h5>
                        <hr/>
                        <p className="card-text">{toCurrency(props.totalRevenue)}</p>
                        <NavLink className="btn btn-success btn-block" to='/add/revenue'>Добавить доходы</NavLink>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}