/**
 * @ngdoc function
 * @name superProductivity.controller:JiraSetInProgressCtrl
 * @description
 * # JiraSetInProgressCtrl
 * Controller of the superProductivity
 */

(function () {
  'use strict';

  angular
    .module('superProductivity')
    .controller('JiraSetInProgressCtrl', JiraSetInProgressCtrl);

  /* @ngInject */
  function JiraSetInProgressCtrl($mdDialog, task, transitions, type, $window, $localStorage) {
    let vm = this;
    vm.transitions = transitions;
    vm.task = task;
    vm.type = type;

    vm.chosenTransitionIndex = $window._.findIndex(vm.transitions, (transition) => {
      return transition.name === (vm.task.originalStatus && vm.task.originalStatus.name);
    });

    vm.updateTask = (chosenTransitionIndex) => {
      let transition = vm.transitions[chosenTransitionIndex];

      if (vm.saveAsDefaultAction) {
        if (!$localStorage.jiraSettings.transitions) {
          $localStorage.jiraSettings.transitions = {};
        }
        $localStorage.jiraSettings.transitions[type] = transition;
        $localStorage.jiraSettings.allTransitions = transitions;
      }

      $mdDialog.hide(transition);
    };

    vm.cancel = () => {
      $mdDialog.cancel();
    };
  }
})();
