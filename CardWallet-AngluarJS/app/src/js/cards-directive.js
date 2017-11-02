(function() {
 "use strict";

  angular.module('app')
    .directive('cards', cardsDDO);

  cardsCtrl.$inject= ['cardService'];
  
  function cardsDDO() {
      return {
        restrict: 'AE',
        controller: cardsCtrl,
        controllerAs: 'vm',
        bindToController: true 
      };
    }
  
  function cardsCtrl(cardService) {
    var vm = this; 

    cardService.getCard('GET','/api/cards')
      .then(successHandler, errorHandler);

    function successHandler (data) {
      vm.cards = data.data;
      data.data.forEach(function(e,i){
        e.vendorLogo =
          e.vendor.toLowerCase().replace(/\s/g, '-'); 
        if( i === 0) {
          e.selected = true;
          vm.selectedCard = e;
        } else {
          e.selected =  false;
        }
      });
    }

    function errorHandler (error) {
      console.error(error);
    }

    vm.selectCard = function(inx, uuid) {
      vm.cards.forEach(function (e) {
        if(e._uuid === uuid) {
          vm.selectedCard = e;
          e.selected = true;
        }
        else{
          e.selected = false ;
        }
      });
    };

    vm.addCard = function () {
      alert('TODO: implement');
      console.log( 'cards controller' )
    }

  }
}());
