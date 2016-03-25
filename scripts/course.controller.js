(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('CourseController', CourseController);

  /** @ngInject */
  function CourseController($window, UserData) {
      var vm = this;  
     vm.btnText = 'Start Course';
     vm.getUserData = function(code) {
        UserData.getAndMarkLessonsViewed(code, null)
        .then(function (res) {
            vm.data = res;
            if (res.latest) {
                vm.btnText = 'Resume Course'; 
                vm.resumeUrl = '/courses/' + code + '/lessons/' + res.latest;    
            }
              
            // _(res).forEach(function(value, key) {
            //     vm[key] = true;
            // })    
        });   
     };
     
      
      
      
  }
})();
