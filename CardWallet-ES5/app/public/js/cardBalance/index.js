import utils from '../utils/utils';

const CardBalanceTemplate = 'Current Balance<span>${{balance}}</span>';

function CardBalance (){
  this.element = document.createElement('header');
  this.element.classList.add('card-balance');
};

CardBalance.prototype.render = function (data) {
   this.element.innerHTML = utils.compileTemplate(CardBalanceTemplate, data).replace(/\.(\d+)/, '.<sup>$1</sup>');
   return this.element;
};

export default CardBalance;
