var mime = require('lib/mime-magic');

exports.testsTextWithoutExtension = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'text/plain');
  });

  assert.equal(mime.lookup('test/data/foo'), 'text/plain');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
