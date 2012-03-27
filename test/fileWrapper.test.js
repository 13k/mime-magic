var mime = require('../lib/mime-magic'),
    assert = require('assert'),
    callback = false;

exports.testsBz2 = function(test) {

  mime.fileWrapper('test/data/foo.txt.bz2', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-bzip2');
    test.done();
  });

};

exports.testsFileNotFound = function(test) {

  mime.fileWrapper('test/data/foobar', function (err, res) {
    callback = true;
    assert.ok(err instanceof Error);
    assert.equal(err.code, 1);
    test.done();
  });

};

exports.testsGz = function(test) {

  mime.fileWrapper('test/data/foo.txt.gz', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-gzip');
    test.done();
  });

};

exports.testsMultiple = function(test) {

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
    test.done();
  });

};

exports.testsPdf = function(test) {

  mime.fileWrapper('test/data/foo.pdf', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/pdf');
    test.done();
  });

};

exports.testsTar = function(test) {

  mime.fileWrapper('test/data/foo.txt.tar', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/x-tar');
    test.done();
  });

};

exports.testsTextWithoutExtension = function(test) {

  mime.fileWrapper('test/data/foo', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'text/plain');
    test.done();
  });

};

exports.testsText = function(test) {

  mime.fileWrapper('test/data/foo.txt', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'text/plain');
    test.done();
  });

};

exports.testsZip = function(test) {

  mime.fileWrapper('test/data/foo.txt.zip', function (err, res) {
    callback = true;
    assert.ifError(err);
    assert.deepEqual(res, 'application/zip');
    test.done();
  });

};

exports.teardown = function(test) {
  assert.ok(callback);
};
