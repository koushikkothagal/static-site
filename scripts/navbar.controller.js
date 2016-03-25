(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController(User) {
    var vm = this;
    vm.currentUser = User.getCurrentUser();
    console.log(vm.currentUser);

  }
})();
