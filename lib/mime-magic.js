var p = require('path'),
    cp = require('child_process'),
    vendor = require('../build/Release/vendor'),
    ext;

try {
  ext = require('../build/Release/mime_magic');
} catch (e) {
  ext = require('../build/default/mime_magic');
}

var fileExec = vendor.LIBMAGIC_FILE_BIN;
var fileFlags = ['--magic-file', vendor.LIBMAGIC_MAGIC_FILE, '--brief', '--mime-type'];

exports.fileWrapper = function(path, cb) {
	cp.execFile(fileExec, fileFlags.concat(Array.isArray(path) ? path : [path]), function (err, stdout) {
		stdout = stdout.trim();
		if (err) {
			if (stdout) {
				err.message = stdout;
			}
			cb(err);
		} else {
			cb(null, Array.isArray(path) ? stdout.split(/\r\n|\n|\r/) : stdout);
		}
	});
};

exports.lookup = ext.lookup;
