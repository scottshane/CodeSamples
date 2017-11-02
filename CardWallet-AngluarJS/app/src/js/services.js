(function() {
  "use stict";
   
  angular.module('app')
    .factory('cardService', cardService);
 
  cardService.$inject=['$http'];
  function cardService ($http, $q) {
    var cards = [];

    function getCard (method, url) {
      return $http({
        method: method,
        url: url 
      });
    }

    function setCard(model) {}

    return {
      getCard: getCard,
      setCard: setCard 
    };
  }
}());
