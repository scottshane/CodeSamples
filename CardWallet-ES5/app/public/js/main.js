// import getCards from './utils/utils';
import utils from './utils/utils';
import Card from './card';
import AddCard from './addCard';
import CardDetail from './cardDetail';
import CardBalance from './CardBalance';
import pubsub from './utils/pubsub';

const cardDetail = new CardDetail();
const cardBalance = new CardBalance();
const addCard = new AddCard();

var cardList = document.querySelector('.cards-list');
var cardTransactions = document.querySelector('.card-transactions');
var cardsFrag = document.createDocumentFragment();
var cards;

  function updateDetails(data){
    cardTransactions.innerHTML = "";
    cardTransactions.appendChild(cardBalance.render(data));
    cardTransactions.appendChild(cardDetail.render(data));
  };

  function renderCards(cardJson) {
    cards = [];
    cards = cardJson.map((e, a, i) => {
      e.vendorLogo = e.vendor.toLowerCase().replace(/\s+/gi,"-");
      return  new Card(e);
    });

    cards.forEach((e, i, a) => {
      cardsFrag.appendChild(e.render());
    });
    cardList.innerHTML = '';
    cardList.appendChild(cardsFrag);
  };
const initalize_cards_handler = function (resp) {
  let cardJson = resp;


  pubsub.subscribe('selectedCard', updateDetails); pubsub.subscribe('newCardAdded', addNewCard);

  function addNewCard(data) {
    cardJson.unshift(data);
    renderCards(cardJson);
    pubsub.publish('selectedCard', cards[0].card)
  }
  // render cards
  renderCards(cardJson);
  //trigger first card detail
  pubsub.publish('selectedCard', cards[0].card)
};

utils.getCards('GET', 'api/cards.json', initalize_cards_handler);
