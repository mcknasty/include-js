/*
 * grunt-include-js
 * https://github.com/makingoff/include-js
 *
 * Copyright (c) 2014 makingoff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js',
        'js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp'],
    },

    // Configuration to be run (and then tested).
    include_js: {
      default_options: {
        files: {
          'test/tmp/custom_options_first-set.html': [
            'js/script_one.js',
            'js/script_two.js'
          ]
        }
      },
      custom_options: {
        options: {
          required: [
            'js/script_one.js',
            'js/script_two.js'
          ],
          prefix: '../',
          force: true,
          livereload: true
        },
        files: {
          'test/tmp/custom_options_second-set.html': [
            'js/module_one.js',
            'js/module_two.js',
            'js/script_three.js'
          ],
          'test/tmp/custom_options_third-set.html': [
            'js/module_one.js',
            'js/module_two.js',
            'js/script_four.js',
            'js/script_five.js'
          ],
          'test/tmp/custom_options_four-set.html': [
            "js/module_one.js",
            "js/module_two.js",
            'js/script_five.js'
          ]
        }
      },
    },
    copy: {
      tests: {
        expand: true,
        cwd: 'test/templates/',
        src: '**',
        dest: 'test/tmp/'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('pretest', ['clean', 'copy', 'include_js']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
