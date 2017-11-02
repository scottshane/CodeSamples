import utils from '../utils/utils';

const CardDetailTemplate = [
  '<dt class="{{type}}">{{title}}',
  '<span class="transaction-details">{{category}} {{transaction}} {{date}}</span>',
  '</dt>',
  '<dd class="transaction-amount {{type}}">${{amount}}</dd>'
].join('');

function CardDetail () {};
CardDetail.prototype.render = function (data) {
  this.element = document.createElement('dl');
  this.element.setAttribute('class', 'entries');

  this.element.innerHTML = data.transactionDetails.map((trans) => {
    return utils.compileTemplate(CardDetailTemplate, trans).replace(/\.(\d+)/, '.<sup>$1</sup>');
  }).join('');

  return this.element;
};

export default CardDetail;
