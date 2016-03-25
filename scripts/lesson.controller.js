(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('LessonController', LessonController);

  /** @ngInject */
  function LessonController(UserData) {
      var vm = this;  
      console.log(vm.courseCode + " " +  vm.name);
      vm.init = function(courseCode, lessonName) {
        UserData.getAndMarkLessonsViewed(courseCode, lessonName)
        .then(function (res) {
            console.log(res);
            vm.data = res;      
        });
      };
        
        
        
      
      
      
  }
})();
