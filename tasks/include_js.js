/*
 * grunt-include-js
 * https://github.com/makingoff/include-js
 *
 * Copyright (c) 2014 makingoff
 * Licensed under the MIT license.
 */

'use strict';
var globule = require('globule');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('include_js', 'Includes javascript-files between <!--Scripts--><!--/Scripts--> at templates.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      prefix: '',
      required: [],
      force: false,
      livereload: false
    });

    var match = /<\!\-\-Scripts\-\->([\s\S.]*)<\!\-\-\/Scripts\-\->/igm;
		var replacement = function (arr)
		{
			return '\n<script type="text/javascript" src="' + arr.join('"></script>\n<script type="text/javascript" src="') + '"></script>';
		};
    var source;
    var required;
    var srcText = '';
    var requiredText = '';
    grunt.log.writeln(this.files[0]);

    if (options.required.length) {
      required = options.required.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return options.prefix + filepath;
      });
      requiredText = replacement(required);
    }
    this.files.forEach(function (f) {
        var expandedFiles = globule.find(f.orig.src);
        var src = filterSource(expandedFiles);
        if (options.livereload) {
            src.push('//localhost:35729/livereload.js');
        }

        srcText = replacement(src);
        source = grunt.file.read(f.dest);

        // Write the destination file.
        grunt.file.write(f.dest, source.replace(match, '<!--Scripts-->' + requiredText + srcText + '\n<!--/Scripts-->'));

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" including:' + (required ? '\n• ' + required.join('\n• ') : '') + (src ? '\n• ' + src.join('\n• ') : ''));
    });
  });

};
