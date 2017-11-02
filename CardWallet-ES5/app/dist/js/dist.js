(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardBalanceTemplate = 'Current Balance<span>${{balance}}</span>';

function CardBalance() {
  this.element = document.createElement('header');
  this.element.classList.add('card-balance');
};

CardBalance.prototype.render = function (data) {
  this.element.innerHTML = _utils2.default.compileTemplate(CardBalanceTemplate, data).replace(/\.(\d+)/, '.<sup>$1</sup>');
  return this.element;
};

exports.default = CardBalance;

},{"../utils/utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _pubsub = require('../utils/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function AddCard() {
  this.form = document.querySelector('.add-card');
  this.addButton = document.querySelector('.add-card-button');
  this.addButton.addEventListener('click', this.handleAddButtonClick.bind(this), false);
  this.form.addEventListener('submit', this.handleSubmit.bind(this), false);
}
AddCard.prototype.render = function (postdata) {
  return this.element;
};
AddCard.prototype.handleSubmit = function (event) {
  event.preventDefault();
  var cardSchema = {
    _id: Math.round(Math.random() * (1000 - 1) + 1),
    vendor: '',
    balance: 0,
    expiry: '',
    accountNumber: '',
    transactionDetails: []
  };
  [].concat(_toConsumableArray(event.target)).forEach(function (card) {
    var name = card.name;
    var value = card.value;

    if (cardSchema[name] !== undefined) {
      if (name === 'expiry') {
        var tmp = value.split('-');
        value = tmp[1] + '/' + tmp[2] + '/' + tmp[0];
      }
      cardSchema[name] = value;
    }
  });

  _pubsub2.default.publish('newCardAdded', cardSchema);
  this.toggleForm(false);
  this.form.reset();
  this.addButton.classList.remove('close');
};

AddCard.prototype.handleAddButtonClick = function (event) {
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
};
AddCard.prototype.toggleForm = function (show) {
  this.form.classList[show ? 'remove' : 'add']('hide');
};

exports.default = AddCard;

},{"../utils/pubsub":6,"../utils/utils":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _pubsub = require('../utils/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardTemplate = ['<div class="card-vendor">', '<img src="assets/{{vendorLogo}}.svg" alt="{{vendor}} card image">', '</div>', '<div class="card-number" data-card-number>{{accountNumber}}</div>', '<div class="card-expiry" data-card-expiry>Valid thru <span>{{expiry}}</span></div>'].join('');

function Card(card) {
  this.card = card;
  _pubsub2.default.subscribe('selectedCard', this.toggleActive.bind(this));
};

Card.prototype.render = function () {
  var _this = this;

  var formmattedCard = Object.assign({}, this.card);
  formmattedCard.accountNumber = formmattedCard.accountNumber.replace(/(\d{4}\s?){3}/g, '**** **** **** ');

  this.element = document.createElement('section');
  this.element.addEventListener('click', function (event) {
    _pubsub2.default.publish("selectedCard", _this.card);
  }, false);

  this.element.setAttribute('class', 'card');
  this.element.innerHTML = _utils2.default.compileTemplate(cardTemplate, formmattedCard);
  return this.element;
};

Card.prototype.toggleActive = function (data) {
  if (data._id !== this.card._id) {
    this.element.classList.remove('selected');
  } else {
    this.element.classList.add('selected');
  }
};

exports.default = Card;

},{"../utils/pubsub":6,"../utils/utils":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardDetailTemplate = ['<dt class="{{type}}">{{title}}', '<span class="transaction-details">{{category}} {{transaction}} {{date}}</span>', '</dt>', '<dd class="transaction-amount {{type}}">${{amount}}</dd>'].join('');

function CardDetail() {};
CardDetail.prototype.render = function (data) {
  this.element = document.createElement('dl');
  this.element.setAttribute('class', 'entries');

  this.element.innerHTML = data.transactionDetails.map(function (trans) {
    return _utils2.default.compileTemplate(CardDetailTemplate, trans).replace(/\.(\d+)/, '.<sup>$1</sup>');
  }).join('');

  return this.element;
};

exports.default = CardDetail;

},{"../utils/utils":7}],5:[function(require,module,exports){
'use strict';

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _addCard = require('./addCard');

var _addCard2 = _interopRequireDefault(_addCard);

var _cardDetail = require('./cardDetail');

var _cardDetail2 = _interopRequireDefault(_cardDetail);

var _CardBalance = require('./CardBalance');

var _CardBalance2 = _interopRequireDefault(_CardBalance);

var _pubsub = require('./utils/pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import getCards from './utils/utils';
var cardDetail = new _cardDetail2.default();
var cardBalance = new _CardBalance2.default();
var addCard = new _addCard2.default();

var cardList = document.querySelector('.cards-list');
var cardTransactions = document.querySelector('.card-transactions');
var cardsFrag = document.createDocumentFragment();
var cards;

function updateDetails(data) {
  cardTransactions.innerHTML = "";
  cardTransactions.appendChild(cardBalance.render(data));
  cardTransactions.appendChild(cardDetail.render(data));
};

function renderCards(cardJson) {
  cards = [];
  cards = cardJson.map(function (e, a, i) {
    e.vendorLogo = e.vendor.toLowerCase().replace(/\s+/gi, "-");
    return new _card2.default(e);
  });

  cards.forEach(function (e, i, a) {
    cardsFrag.appendChild(e.render());
  });
  cardList.innerHTML = '';
  cardList.appendChild(cardsFrag);
};
var initalize_cards_handler = function initalize_cards_handler(resp) {
  var cardJson = resp;

  _pubsub2.default.subscribe('selectedCard', updateDetails);_pubsub2.default.subscribe('newCardAdded', addNewCard);

  function addNewCard(data) {
    cardJson.unshift(data);
    renderCards(cardJson);
    _pubsub2.default.publish('selectedCard', cards[0].card);
  }
  // render cards
  renderCards(cardJson);
  //trigger first card detail
  _pubsub2.default.publish('selectedCard', cards[0].card);
};

_utils2.default.getCards('GET', 'api/cards.json', initalize_cards_handler);

},{"./CardBalance":1,"./addCard":2,"./card":3,"./cardDetail":4,"./utils/pubsub":6,"./utils/utils":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var subscribers = {};
var pubsub = {
  subscribe: function subscribe(event, callback) {
    if (!subscribers[event]) {
      subscribers[event] = [];
    }
    subscribers[event].push(callback);
  },
  publish: function publish(event, data) {
    if (!subscribers[event]) {
      return false;
    }
    subscribers[event].forEach(function (callback) {
      callback(data);
    });
  }
};

exports.default = pubsub;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _protocolFileCards = require('../../mock-api/protocolFileCards.js');

var _protocolFileCards2 = _interopRequireDefault(_protocolFileCards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCards = function getCards(method, url, callback) {

  if (window.location.protocol !== 'http:') {
    console.log('serving local json');
    callback(_protocolFileCards2.default);
  } else {
    (function () {
      console.log('serving xhr mock json');

      var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : XMLHttpRequest && new XMLHttpRequest() || null;

      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", 'application/json');

      xhr.onload = function (event) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
        } else {
          console.error(xhr.responseText);
        }
      };
      xhr.onerror = function (event) {
        return console.error(xhr.statusText);
      };
      xhr.send(null);
    })();
  }
};

var compileTemplate = function compileTemplate(templateStr, hash) {
  return templateStr.replace(/{{(\w+)}}/g, function (match, capture1, offset) {
    return hash[capture1];
  });
};

exports.default = { getCards: getCards, compileTemplate: compileTemplate };

},{"../../mock-api/protocolFileCards.js":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  "_id": "181a7502e2f95dab6c674e0a",
  "vendor": "visa",
  "balance": 1234.23,
  "expiry": "12/09/2019",
  "accountNumber": "1234 1234 1234 4343",
  "transactionDetails": [{
    "title": "glennlivet 12 year",
    "vendor": "costco",
    "_id": "180a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "12, July 2016",
    "amount": "95.00",
    "type": "debit"
  }, {
    "title": "Funds Added",
    "category": "payment",
    "transaction": "#xcgfd42342xc",
    "date": "16, July 2016",
    "amount": "500.00",
    "type": "credit"
  }, {
    "title": "4pk 16oz Rib-eye",
    "vendor": "costco",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "18, July 2016",
    "amount": "42.00",
    "type": "debit"
  }, {
    "title": "5lbs Anderson Apple Smoked Bacon",
    "vendor": "costco",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "18, July 2016",
    "amount": "42.00",
    "type": "debit"
  }]
}, {
  "_id": "280a7502e2f95dab6c674e0a",
  "vendor": "American Express",
  "balance": 3459.23,
  "expiry": "12/09/2019",
  "accountNumber": "1234 1234 1234 20001",
  "transactionDetails": [{
    "title": "Lagavulin 16 year",
    "vendor": "costco",
    "_id": "280a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "9, July 2016",
    "amount": "96.00",
    "type": "debit"
  }, {
    "title": "Funds Added",
    "category": "payment",
    "transaction": "#xcgfd42342xc",
    "date": "10, July 2016",
    "amount": "500.00",
    "type": "credit"
  }, {
    "title": "Pomade mustache wax",
    "vendor": "The Barber Shop",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "12, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "3 pack standard black combs",
    "vendor": "costco",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "12, July 2016",
    "amount": "24.00",
    "type": "debit"
  }, {
    "title": "12pk Alto Sax Traditional Reeds #3",
    "vendor": "Guitar Center",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "Duke Silver",
    "transaction": "#323424df43534",
    "date": "12, July 2016",
    "amount": "24.00",
    "type": "debit"
  }]
}, {
  "_id": "380a7502e2f95dab6c674e0a",
  "vendor": "Mastercard",
  "balance": 9856.23,
  "expiry": "12/09/2019",
  "accountNumber": "1234 1234 1234 3243",
  "transactionDetails": [{
    "title": "blue buffalo alligator ",
    "vendor": "petco",
    "_id": "380a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "23, July 2016",
    "amount": "61.00",
    "type": "debit"
  }, {
    "title": "Funds Added",
    "category": "payment",
    "transaction": "#xcgfd42342xc",
    "date": "24, July 2016",
    "amount": "1000.00",
    "type": "credit"
  }, {
    "title": "oil filter",
    "vendor": "NAPA",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "Automotive",
    "transaction": "#323424df43534",
    "date": "30, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "Fill-up w/ free wash",
    "vendor": "Union 76",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "Automotive",
    "transaction": "#323424df43534",
    "date": "30, July 2016",
    "amount": "42.00",
    "type": "debit"
  }]
}, {
  "_id": "480a7502e2f95dab6c674e0a",
  "vendor": "Paypal",
  "balance": 1234.23,
  "expiry": "12/09/2019",
  "accountNumber": "1234 1234 1234 4343",
  "transactionDetails": [{
    "title": "untrustworthy video outfit",
    "vendor": "the internet",
    "_id": "480a7502e2f95dab6c674e0a",
    "category": "entertainment",
    "transaction": "#323424df43534",
    "date": "10, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "Funds Added",
    "category": "payment",
    "transaction": "#xcgfd42342xc",
    "date": "11, July 2016",
    "amount": "500.00",
    "type": "credit"
  }, {
    "title": "Vintage Stanley no.5 hand plane",
    "vendor": "ebay",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "entertainment",
    "transaction": "#323424df43534",
    "date": "11, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "parts for old printing press",
    "vendor": "ebay",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "food & health",
    "transaction": "#323424df43534",
    "date": "15, July 2016",
    "amount": "44.00",
    "type": "debit"
  }]
}, {
  "_id": "580a7502e2f95dab6c674e0a",
  "vendor": "Amazon",
  "balance": 1234.23,
  "expiry": "12/09/2019",
  "accountNumber": "1234 1234 1234 4343",
  "transactionDetails": [{
    "title": "toiletries",
    "vendor": "Amazon",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "neccessities",
    "transaction": "#323424df43534",
    "date": "18, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "Funds Added",
    "category": "payment",
    "transaction": "#xcgfd42342xc",
    "date": "19, July 2016",
    "amount": "500.00",
    "type": "credit"
  }, {
    "title": "cleaning supplies",
    "vendor": "Amazon",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "home goods",
    "transaction": "#323424df43534",
    "date": "22, July 2016",
    "amount": "44.00",
    "type": "debit"
  }, {
    "title": "epson ink cartridge - black",
    "vendor": "Amazon",
    "_id": "580a7502e2f95dab6c674e0a",
    "category": "office",
    "transaction": "#323424df43534",
    "date": "23, July 2016",
    "amount": "44.00",
    "type": "debit"
  }]
}];

},{}]},{},[5])


//# sourceMappingURL=dist.js.map
