var mime = require('lib/mime-magic');

exports.testsMultiple = function(beforeExit, assert) {

  var callback = false;

  var files = [
    'test/data/foo.txt.bz2',
    'test/data/foo.txt.gz',
    'test/data/foo.txt.zip',
    'test/data/foo.txt.tar',
    'test/data/foo.pdf',
    'test/data/foo.txt'
  ];

  var expected = [
    'application/x-bzip2',
    'application/x-gzip',
    'application/zip',
    'application/x-tar',
    'application/pdf',
    'text/plain'
  ];

  mime.fileWrapper(files, function (err, res) {
    callback = true;
    assert.ifError(err);
    for (var i in res) {
      assert.deepEqual(res[i], expected[i]);
    }
  });

  beforeExit(function() {
    assert.ok(callback, 'Ensure callback was called');
  });
};
