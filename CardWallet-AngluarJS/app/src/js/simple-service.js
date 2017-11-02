(function() {
  "use strict";

  angular.module('app')
    .factory('communicate', function($q){
      var message = 'Hello'; 

      function setMessage (msg) {
        console.log(msg);
        return message = msg; 
      }
      function getMessage () {
        return $q(function(resolve, reject){
          setTimeout(function(){
            resolve(message); 
          }, 1000);
        }); 
      }

      return {
        setMessage: setMessage,
        getMessage: getMessage
      };
    });
}()); 
