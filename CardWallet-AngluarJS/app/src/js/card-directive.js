(function() {
  "use strict";
  angular.module('app')
    .directive('card', cardDDO);
    
    var template = '/js/template/card/card.tmpl';
    function cardDDO () {
      return {
        restrict: 'AE',
        require: '^cards', 
        templateUrl: template,
        link: angular.noop() 
      };
    }
}());    

