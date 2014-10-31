'use strict';

describe('Directive: scatterfund', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scatterfund></scatterfund>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scatterfund directive');
  }));
});
