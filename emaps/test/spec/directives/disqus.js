'use strict';

describe('Directive: disqus', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<disqus></disqus>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the disqus directive');
  }));
});
