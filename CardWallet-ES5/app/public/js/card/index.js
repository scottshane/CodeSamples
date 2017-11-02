import utils from '../utils/utils';
import pubsub from '../utils/pubsub';

const cardTemplate = [
    '<div class="card-vendor">',
      '<img src="assets/{{vendorLogo}}.svg" alt="{{vendor}} card image">',
    '</div>',
    '<div class="card-number" data-card-number>{{accountNumber}}</div>',
    '<div class="card-expiry" data-card-expiry>Valid thru <span>{{expiry}}</span></div>'
  ].join('');

 function Card (card) {
   this.card = card;
   pubsub.subscribe('selectedCard', this.toggleActive.bind(this))
};

Card.prototype.render = function () {
  let formmattedCard = Object.assign({}, this.card);
  formmattedCard.accountNumber = formmattedCard.accountNumber
      .replace(/(\d{4}\s?){3}/g, '**** **** **** ');

  this.element = document.createElement('section');
  this.element.addEventListener('click', (event) => {
    pubsub.publish("selectedCard", this.card)
  }, false);

  this.element.setAttribute('class','card');
  this.element.innerHTML = utils.compileTemplate(cardTemplate, formmattedCard);
  return this.element;
};

Card.prototype.toggleActive = function (data) {
  if(data._id !== this.card._id){
    this.element.classList.remove('selected')
  } else {
    this.element.classList.add('selected');
  }
};

export default Card;
