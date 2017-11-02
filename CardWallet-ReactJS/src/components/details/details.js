import React, { Component } from 'react';
import Checkboxes from '../checkboxes';

export default class Details extends Component {
  constructor(props){
    super(props);
    this.state = {
      filteredTransaction: props.transactions,
      filterOn: {},
      toggleFilters: false
    }
    this.filterTransCategories = this.filterTransCategories.bind(this);
    this.handleToggleFilter = this.handleToggleFilter.bind(this);
  } 
   
  componentWillReceiveProps(nextProps) {
    if (!this.props.filteredTransaction && nextProps.transactions) {
      this.setState({
        filteredTransaction: nextProps.transactions
      });
    }
  }
  
  handleToggleFilter () {
    this.setState({
      toggleFilters:  !this.state.toggleFilters
    });

    console.log('%cfilter clicked:', 'color:hotpink', );
  }

  filterTransCategories(value, checked){
    const newFilterOn = Object.assign({},this.state.filterOn);
    newFilterOn[value] = checked;
    
    const filtered = this.props.transactions.filter((t) => {
      return !!newFilterOn[t.category]
    });
    
    this.setState({
      filterOn: newFilterOn,
      filteredTransaction: filtered.length ? filtered : this.props.transactions 
     })
  }

  render() {
    const translen = this.props.transactions.length;
    const categories = this.props.categories;

    return (
      <div className="card-transactions">
        <header>
          <h2>Current Statement</h2>
        </header>
        <div className="statement">
          <div className="category-filter">
            <button onClick={this.handleToggleFilter} type="button"><i className='wallet-filter_list' /></button>
            {this.state.toggleFilters &&
              <div>
                <Checkboxes handleChange={this.filterTransCategories} labels={categories} />
              </div>
            }
          </div>
          <div className="tableWrapper">
          <table className="transaction-details-list">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Desciption</th>
              </tr>
            </thead>
            <tbody>{
              this.state.filteredTransaction.map((trans, index) => {
                return (
                  <tr key={`trans-${index}`}>
                    <td className={`trans-type ${trans.type}`}><i className={`wallet-${trans.type ==='debit' ? 'remove_circle' : 'add_circle'}`}/></td>
                    <td className='trans-date'>{trans.date}</td>
                    <td className='trans-vendor'>{trans.vendor}</td>
                    <td className="trans-category">{trans.category}</td>
                    <td className='trans-amount'> ${trans.amount}</td>
                    <td className='trans-title'>
                      <div>{trans.title}</div>
                      <div className='trans-transaction-id'>{trans.transaction}</div>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }
}

Details.defaultProps = {
  categories:[],
  transactions:[] 
};