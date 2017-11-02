import React from 'react';
import PropTypes from 'prop-types';

export default function Card(props) {
  const classes = props.selected ?  'card active' : 'card';
  let obsfucatedAccountNumber= props.accountNumber.replace(/(\d{4}\s?){3}/g, '**** **** **** ');

  function handler(event) {
    props.handleClick(props.uuid)
  }

  return (
    <li className={classes} onClick={handler}>
      <img className="card-vendor-logo" src={`/public/assets/${props.logo}`} alt={props.vendor} />
      <p className="card-acct-num">{obsfucatedAccountNumber}</p>
      <p className="card-expiry">Valid Thru: {props.expiry}</p>
    </li>
  );
}

Card.defaultProps = {
  handleClick: function () { }
};

Card.propTypes = {
  uuid: PropTypes.string,
  vendor: PropTypes.string,
  accountNumber: PropTypes.string,
  expiry: PropTypes.string,
  balance: PropTypes.number,
  handleClick: PropTypes.func,
};