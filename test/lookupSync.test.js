var mime = require('../lib/mime-magic'),
    assert = require('assert');

exports.testsBz2 = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.txt.bz2'), 'application/x-bzip2');
  test.done();
};

exports.testsFileNotFound = function(test) {

  try {
    mime.lookupSync('test/data/foobar');
  } catch(e) {
    assert.ok(e instanceof Error);
  }

  test.done();

};

exports.testsGz = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.txt.gz'), 'application/x-gzip');
  test.done();
};

exports.testsPdf = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.pdf'), 'application/pdf');
  test.done();
};

exports.testsTar = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.txt.tar'), 'application/x-tar');
  test.done();
};

exports.testsTextWithoutExtension = function(test) {
  assert.equal(mime.lookupSync('test/data/foo'), 'text/plain');
  test.done();
};

exports.testsText = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.txt'), 'text/plain');
  test.done();
};

exports.testsZip = function(test) {
  assert.equal(mime.lookupSync('test/data/foo.txt.zip'), 'application/zip');
  test.done();
};
