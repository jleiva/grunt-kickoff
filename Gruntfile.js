'use strict';
// Configuring Grunt tasks:
// http://gruntjs.com/configuring-tasks
module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Watch for changes and trigger compass, jshint & uglify
        watch: {
          compass: {
            files: ['sass/{,**/}*.scss'],
            tasks: ['compass:dev']
          },
          js: {
            files: '<%= jshint.all %>',
            tasks: ['jshint', 'uglify:dev']
          }
        },

        // Compass and scss
        compass: {
          options: {
            config: 'config.rb'
          },
          dev: {
            options: {
              environment: 'development',
              outputStyle: 'expanded',
              relativeAssets: true
            }
          },
          prod: {
            options: {
              environment: 'production',
              outputStyle: 'compact',
              force: true
            }
          }
        },
        
        // Javascript linting with jshint
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },
          all: [
            'js/sonambulo.js'
          ]
        },

        // Concat & minify
        uglify: {
          dev: {
            options: {
              mangle: false,
              compress: false,
              preserveComments: 'all',
              beautify: true
            },
            files: {
              'js/sonambulo.min.js': ['js/sonambulo.js']
              // Output: input
            }
          },
          prod: {
            options: {
              mangle: true,
              compress: true
            },
            files: {
              'js/sonambulo.min.js': ['js/sonambulo.js']
            }
          }
        }
    });
 
    // Load the plugin(s), but I'm using load-grunt-tasks 
    // https://github.com/sindresorhus/load-grunt-tasks
    // grunt.loadNpmTasks('grunt-concurrent');
 
 
    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    // The "default" task is what I leave running all the time. Since it is the default, 
    // you can start it by simply running 
    // $ grunt
    // or, to run production's tasks
    // $ grunt build
    
    grunt.registerTask('build', [
        'jshint',
        'uglify:prod',
        'compass:prod'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'uglify:dev',
        'compass:dev',
        'watch'
    ]);
};