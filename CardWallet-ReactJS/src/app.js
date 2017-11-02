import React, { Component } from 'react';
import Card from './components/cards/card';
import Details from './components/details/details';
import CardMocks from './mocks/cardsMocks';
import DetailsMocks from './mocks/detailsMocks';
import VendorMocks from './mocks/vendorsMocks';
import AddCard from './components/addCard/addcard';
import './scss/main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: CardMocks,
      details: DetailsMocks,
      vendors: VendorMocks,
      currentCard: '',
      addCardIsVisible: false
    };
    this.updateCurrentCard = this.updateCurrentCard.bind(this);
    this.toggleAddCard = this.toggleAddCard.bind(this);
    this.handleAddedCard = this.handleAddedCard.bind(this);
  }
// Lifecycle
  componentWillMount(){
    this.setState({
      currentCard:this.state.cards[0]._uuid
    });
  }
//---

  handleAddedCard(result) {
    const newCards = this.state.cards.concat();
    const newDetails = Object.assign({}, this.state.details);

    newCards.unshift(result);
    newDetails[result._uuid] = [];

   this.setState({
    cards: newCards,
    currentCard: result._uuid,
    details: newDetails,
    addCardIsVisible: false
   }) 
  }

  getCurrentCategories() {
    if(!this.state.currentCard || 
      this.state.details[this.state.currentCard].length < 2) {
      return [];
    }

    let categories = this.state.details[this.state.currentCard].map(detail => { 
       return detail.category;
    })
    categories = [...new Set(categories)]

    return categories;
  }

  toggleAddCard() {
    // bool isVisible
    this.setState({
      addCardIsVisible: !this.state.addCardIsVisible
    })
  }

  updateCurrentCard(uuid) {
    this.setState({
      currentCard: uuid
    })
  }

  render() {
    const {details, currentCard, cards, vendors} = this.state;
    const currentDetails = details[currentCard];
    const categories = this.getCurrentCategories();

    return (
      <div>
      <div className="card-ledger">
        <div className="cards">
          <header>
            <h2>My Wallet</h2>
          </header>
          <button className='add-card-button' onClick={this.toggleAddCard} type="button">
           <i className='wallet-payment' /> Add a card </button>
           { this.state.addCardIsVisible && <AddCard addCard={this.handleAddedCard} vendorList={vendors} /> }

        <ul className="card-list">
          {cards.map(({ _uuid, accountNumber, vendor, expiry, balance }) => {
            return <Card
              selected = {_uuid === this.state.currentCard}
              key={_uuid}
              handleClick={this.updateCurrentCard}
              uuid={_uuid}
              accountNumber={accountNumber}
              vendor={vendors[vendor].name}
              logo={vendors[vendor].logo}
              expiry={expiry}
              balance={balance}
            />
          })
        }
        </ul>
        </div>
        <Details categories={ categories } transactions={ currentDetails } />
      </div>
      </div>
    );
  }
}
