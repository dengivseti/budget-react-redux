import React, { Component} from 'react'
import DatePicker from "react-datepicker"

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.categoryList = []
        this.state = {
            type: props.payment ? props.payment.type : 'expense',
            amount: props.payment.amount ? props.payment.amount : '',
            category: props.payment.category ? props.payment.category : '',
            description: props.payment.description ? props.payment.description : '',
            createdAt: props.payment.createdAt ? new Date(props.payment.createdAt): new Date(),
            note: props.payment.note ? props.payment.note : '',
            categories: props.payment.categories,
            error: ''
          };
    }

    renderCategory() {
        return this.state.categories.map((category, idx) => {
            return (
                <option key={idx}>{category}</option>
            )
        })
    }

    onAmountChange = amount => {
        if (amount) {
            this.setState(() => ({amount}))
        }
    }

    onCategoryChage = category => {
        if (category) {
            this.setState(() => ({category}))
        }
    }

    onDescriptionChange = description => {
        if (description) {
            this.setState(() => ({description}))
        }
    }

    onDateChange = createdAt => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }

    onNoteChange = note => {
        if (note) {
            this.setState({ note })
        }
    }

    onSubmit = e => {
        e.preventDefault()
        let category =null
        if (!this.state.category){
            category = this.state.categories[0]
        }else {
            category = this.state.category
        }
        this.props.onSubmit({
            type: this.state.type,
            amount: Math.abs(+this.state.amount),
            category: category,
            description: this.state.description,
            createdAt: this.state.createdAt.toJSON(),
            note: this.state.note,
        })
    }

    render() {
        return (
                <div className="row justify-content-center mt-2">
                    <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="amount">Сумма:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="amount" 
                            placeholder="1 000"
                            value={this.state.amount}
                            onChange={e => this.onAmountChange(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Категория:</label>
                        <select 
                            className="form-control" 
                            id="category"
                            value={this.state.category}
                            onChange={e => this.onCategoryChage(e.target.value)}
                        >
                            {this.renderCategory()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Теги:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.description}
                            id="description" 
                            placeholder="Теги через запятую"
                            onChange={e => this.onDescriptionChange(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row justify-content-between">
                            <div className="col">
                            <label htmlFor="date">Дата:</label>
                            </div>
                            <div className="col">
                                <DatePicker
                                    selected={this.state.createdAt}
                                    onChange={this.onDateChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Заметка: </label>
                        <textarea 
                            className="form-control" 
                            id="note" 
                            rows="3"
                            value={this.state.note}
                            onChange={e=> this.onNoteChange(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                    </div>
                    </form>
                </div>
        )
    }
}
