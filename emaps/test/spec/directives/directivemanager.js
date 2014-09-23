'use strict';

describe('Directive: directiveManager', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directive-manager></directive-manager>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the directiveManager directive');
  }));
});
