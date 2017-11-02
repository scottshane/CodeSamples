(function() {
  "use static";

  angular.module('app')
    .directive('balance', balanceDDO);
      
      function balanceDDO () {
      return {
        restrict: 'AE',
        require: '^cards',
        template: [
          '<header class="card-balance">Current Balance',
            '<span ng-bind-html="vm.selectedCard.balance|currency|supscript"></span>',
          '</header>'
        ].join(''),
        link: angular.noop() 
      };
    }
}());    


