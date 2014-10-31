'use strict';

describe('Controller: NarrativectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('emapsApp'));

  var NarrativectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NarrativectrlCtrl = $controller('NarrativectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
