var mime = require('lib/mime-magic');

exports.testsFileNotFound = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foobar', function (err, res) {
    callback = true;
    assert.ok(err instanceof Error);
    assert.equal(err.code, 1);
  });

  try {
    mime.lookup('test/data/foobar');
  } catch(e) {
    assert.ok(e instanceof Error);
  }

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
