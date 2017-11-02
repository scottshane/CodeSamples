import React, { Component } from 'react';
import PropTypes from 'prop-types';
//this need to find its way to a utils.js file at some point 
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

export default class AddCard extends Component {
constructor(props) {
  super(props);

  this.state= {}
  this.handleSubmit = this.handleSubmit.bind(this);
}
  handleSubmit(event) {
    event.preventDefault();
    const result = {
      _uuid: generateUUID(),
      balance: 0,
    }

    for(let i = 0, len=event.target.length; i<len; i++) {
      const {name, value}= event.target[i];
      if(name) {
        result[name] = value;
      } 
    }
    this.props.addCard(result)
  }

  render() {
    
    return (
      <div className='add-card-control-group'>
        <form onSubmit={this.handleSubmit} >
        <fieldset>
          <label>Select Card Issuer</label>
          <select name="vendor" id="vendor">
            {
             Object.keys(this.props.vendorList).map( (key, idx)=> {
               const vendorKey = this.props.vendorList[key];
              return <option key={`vl-${idx}`} value={key}>{vendorKey.name}</option>
            })
          } 
          </select>
          <label htmlFor="accountNumber">Account number</label>
          <input type="text" name="accountNumber" id="account-number" />
          <label htmlFor='expiry-date'>Expiration Date</label>
          <input type="date" name="expiry" id="expiry-date" />
          <button type='submit'>Submit</button>
        </fieldset>
        </form>
      </div>
    )
  }
}

AddCard.displayName = 'AddCard'
AddCard.defaultProps = { 
  vendorList: []
}
AddCard.propTypes = { }
