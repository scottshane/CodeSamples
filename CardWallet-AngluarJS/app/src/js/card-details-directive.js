(function() {
 "use strict";
  angular.module('app')
    .directive('detail', detailsDDO);
     
      var template = '/js/template/details/details.tmpl';
      function detailsDDO () {
      return {
        restrict: 'AE',
        require: '^cards',
        templateUrl:  template,
        link: function (scope, el, attr, ctrl) {
          console.log(ctrl);  
        },
      }; 
    }
}());    
