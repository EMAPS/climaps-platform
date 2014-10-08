'use strict';

describe('Controller: ForewordCtrl', function () {

  // load the controller's module
  beforeEach(module('emapsApp'));

  var ForewordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForewordCtrl = $controller('ForewordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
