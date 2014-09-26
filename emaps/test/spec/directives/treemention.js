'use strict';

describe('Directive: treemention', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<treemention></treemention>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the treemention directive');
  }));
});
