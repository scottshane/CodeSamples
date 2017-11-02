(function() {
  "use strict";
  angular.module('app')
    .directive('addCard', addCardDDO);

  const template = 'js/template/add-card.tmpl';
  
  function addCardDDO () {
    return {
      restict: 'AE',
      require: '^cards',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: template,
      link: function (scope, el, attr, ctrl) {}
    }; 
  }
}())

