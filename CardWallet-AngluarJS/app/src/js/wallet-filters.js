(function() {
  "use strict";
  angular.module('app')
    .filter('obsfucated', function() {
    return function (input){
      var out = input.replace(/(\d{4}\s?){3}/g, '**** **** **** '); 
      return out;
    };
  })
  .filter('supscript', function($sce) {
    return function(val) {
      var _val = val;
      if(_val !== 'string') {
        _val = String(_val);
      }
      var out = _val.replace(/\.(\d+)/, '.<sup>$1</sup>');
      return $sce.trustAsHtml(out);
    };
  });
}());  
