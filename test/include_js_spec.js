/* global describe, it, expect, after */
const grunt = require('grunt');
const chai = require('chai');
chai.should();

const tmpDir = 'test/tmp/';
const snapDir = 'test/snapshots/';

const replace_newlines = (str) => str.replace(/\r/g, '');

const file_get_contents = (path) => {
  const contents = grunt.file.read(path);
  return replace_newlines(contents);
};

const awiatTaskComplete = (task, callback) => {
  return new Promise((resolve) => {
    grunt.util.spawn({
      cmd: "grunt",
      args: [task]
    }, function(err, result, code) {
      if ( code === 0 ) {
        callback(result);
        resolve();
      }
      else {
        console.error(err, typeof err);
        let msg = 'Return Error code: ' + code.toString();
        msg += " " + err.toString() + " " + result.toString();
        expect.fail(msg);
        resolve();
      }
    });
  });
};

const testInclude = (fileName, message) => {
  const actual = file_get_contents(tmpDir + fileName);
  const expected = file_get_contents(snapDir + fileName);
  actual.should.eql(expected, message);
};

describe('Include Js Tests', function() {
  /** * /
  after(function() {
    awiatTaskComplete('clean', () => {
      console.log('Tmp files purged.');
    });
  });
  /** */
  it('Test 1', function() {
    return awiatTaskComplete('pretest', (results) => {
      const fileName = 'custom_options_first-set.html';
      const message = 'First set did not process correctly';
      testInclude(fileName, message);
    });
  });

  it('Test 2', function() {
    return awiatTaskComplete('pretest', (results) => {
      const fileName = 'custom_options_second-set.html';
      const message = 'Second set not equal.';
      testInclude(fileName, message);
    });
  });

  it('Test 3', function()  {
    return awiatTaskComplete('pretest', (results) => {
      const fileName = 'custom_options_third-set.html';
      const message = 'Third set not equal.';
      testInclude(fileName, message);
    });
  });

  it('Test 4', function() {
    return awiatTaskComplete('pretest', (results) => {
      const fileName = 'custom_options_four-set.html';
      const message = 'Four set not equal.';
      testInclude(fileName, message);
    });
  });
});
