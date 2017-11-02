import utils from '../utils/utils';
import pubsub from '../utils/pubsub';

function AddCard(){
  this.form = document.querySelector('.add-card');
  this.addButton = document.querySelector('.add-card-button');
  this.addButton.addEventListener('click', this.handleAddButtonClick.bind(this), false);
  this.form.addEventListener('submit', this.handleSubmit.bind(this), false);
}
AddCard.prototype.render = function (postdata) {
    return this.element;
}
AddCard.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const cardSchema = {
    _id: (Math.round(Math.random() * (1000 - 1) + 1)),
    vendor: '',
    balance: 0,
    expiry: '',
    accountNumber: '',
    transactionDetails : []
  };
  [...event.target].forEach( card => {
    let { name, value } = card;
    if (cardSchema[name] !== undefined) {
      if(name === 'expiry') {
        let tmp = value.split('-');
        value = `${tmp[1]}/${tmp[2]}/${tmp[0]}`;
      }
      cardSchema[name] = value;
    }
  });

  pubsub.publish('newCardAdded', cardSchema);
  this.toggleForm(false);
  this.form.reset();
  this.addButton.classList.remove('close');
};

AddCard.prototype.handleAddButtonClick = function(event) {
  event.preventDefault();
  if (event.currentTarget.classList.contains('close')) {
    // it's the x sign
    event.currentTarget.classList.remove('close');
    this.toggleForm(false);
    this.form.reset();
  } else {
    // it's the + sign
    event.currentTarget.classList.add('close');
    this.toggleForm(true);
  }
}
AddCard.prototype.toggleForm = function (show) {
  this.form.classList[(show) ? 'remove': 'add']('hide');
};

export default AddCard;
