'use strict';

describe('Directive: dna', function () {

  // load the directive's module
  beforeEach(module('emapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dna></dna>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dna directive');
  }));
});
