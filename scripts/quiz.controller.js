(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('QuizController', QuizController);

  /** @ngInject */
  function QuizController(UserData, QuizData) {
      var vm = this;  
      vm.quizContent = QuizData.data.quizContent;  
        
        
      
      
      
  }
})();
