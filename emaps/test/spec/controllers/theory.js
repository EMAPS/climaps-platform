'use strict';

describe('Controller: TheoryCtrl', function () {

  // load the controller's module
  beforeEach(module('emapsApp'));

  var TheoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TheoryCtrl = $controller('TheoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
