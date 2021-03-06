'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.include_js = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options_first-set.html');
    var expected = grunt.file.read('test/expected/custom_options_first-set.html');
    test.equal(actual, expected, 'First-set not equal.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(3);

    var actual = grunt.file.read('tmp/custom_options_second-set.html');
    var expected = grunt.file.read('test/fixtures/custom_options_second-set.html');
    test.equal(actual, expected, 'Second set not equal.');

    actual = grunt.file.read('tmp/custom_options_third-set.html');
    expected = grunt.file.read('test/fixtures/custom_options_third-set.html');
    test.equal(actual, expected, 'Third set not equal.');

    actual = grunt.file.read('tmp/custom_options_four-set.html');
    expected = grunt.file.read('test/fixtures/custom_options_four-set.html');
    test.equal(actual, expected, 'Four set not equal.');

    test.done();
  },
};
