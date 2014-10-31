'use strict';

describe('Directive: multiplestatic', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<multiplestatic></multiplestatic>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the multiplestatic directive');
  }));
});
