module.exports = function(grunt) {

    var js_dir = "components";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    outputStyle: 'compressed'
                }
            }
        },

        watch: {
            js : {
                files: ['**/*.js', '!build/**/*.js'],
                tasks: ['concat:custom','uglify:custom','concat:components','uglify:components','concat:all'],
                options: {
                    livereload: true,
                }
            },
            css : {
                files: ['**/*.scss'],
                tasks: ['compass'],
                options: {
                    livereload: true,
                }
            },
            all : {
                files: ['**/*.html'],
                options : {
                    livereload: true,
                }
            }
        },

        concat: {
              options: {
                separator : '\n',
              },
              components : {
                files : [{
                  src : [
                    js_dir+'jquery/*.min.js',
                    // js_dir+'velocity/velocity.min.js',
                    // js_dir+'velocity/velocity-ui.min.js',
                    // js_dir+'fastclick/*.js',
                  ],
                  dest: js_dir+'build/concatenated/<%= pkg.name %>.components.cat.js'
                }]
              },
              all : {
                files : [{
                  src : [js_dir+'build/minified/<%= pkg.name %>.components.min.js'],
                  dest : js_dir+'build/<%= pkg.name %>.min.js',
                }]
              }
        },

        uglify: {
          options : {
            preserveComments: false,
            mangle : false,
            compress : {
              unused : false,
              keep_fargs : true,
            }
          },
          components : {
            files : [{
              src : [js_dir+'build/concatenated/<%= pkg.name %>.components.cat.js'],
              dest : js_dir+'build/minified/<%= pkg.name %>.components.min.js',
            }]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compass']);
    grunt.registerTask('build', ['compass','concat:custom','uglify:custom','concat:components','uglify:components','concat:all']);
};