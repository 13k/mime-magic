var mime = require('lib/mime-magic');

exports.testsZip = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo.txt.zip', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/zip');
  });

  assert.equal(mime.lookup('test/data/foo.txt.zip'), 'application/zip');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
