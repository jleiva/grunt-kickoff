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
            tasks: ['newer:jshint', 'uglify:dev']
          },
          images: {
            files: ['src-img/**/*.{png,jpg,gif}'],
            tasks: ['newer:imagemin'],
            options: {
            spawn: false,
            }
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

        imagemin: {
          options: {
            optimizationLevel: 3,
            cache: false
          },

          dist: {
            files: [{
              // cwd is 'current working directory'
              expand: true,                  // Enable dynamic expansion
              cwd: 'src-img/',               // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'img/'                  // Destination path prefix
            }]
          }
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
        'imagemin',
        'newer:jshint',
        'uglify:dev',
        'compass:dev',
        'watch'
    ]);
};