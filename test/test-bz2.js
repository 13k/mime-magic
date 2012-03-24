var mime = require('lib/mime-magic');

exports.testsBz2 = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo.txt.bz2', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-bzip2');
  });

  assert.equal(mime.lookup('test/data/foo.txt.bz2'), 'application/x-bzip2');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
