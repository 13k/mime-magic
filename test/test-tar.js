var mime = require('lib/mime-magic');

exports.testsTar = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo.txt.tar', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-tar');
  });

  assert.equal(mime.lookup('test/data/foo.txt.tar'), 'application/x-tar');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
