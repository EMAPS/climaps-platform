'use strict';

describe('Controller: NarrativesCtrl', function () {

  // load the controller's module
  beforeEach(module('emapsApp'));

  var NarrativesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NarrativesCtrl = $controller('NarrativesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
