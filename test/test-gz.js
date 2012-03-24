var mime = require('lib/mime-magic');

exports.testsGz = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo.txt.gz', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-gzip');
  });

  assert.equal(mime.lookup('test/data/foo.txt.gz'), 'application/x-gzip');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
