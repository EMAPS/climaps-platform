'use strict';

describe('Service: File', function () {

  // load the service's module
  beforeEach(module('emapsApp'));

  // instantiate service
  var File;
  beforeEach(inject(function (_File_) {
    File = _File_;
  }));

  it('should do something', function () {
    expect(!!File).toBe(true);
  });

});
