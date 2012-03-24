var mime = require('lib/mime-magic');

exports.testsPdf = function(beforeExit, assert) {

  var callback = false;

  mime.fileWrapper('test/data/foo.pdf', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/pdf');
  });

  assert.equal(mime.lookup('test/data/foo.pdf'), 'application/pdf');

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
