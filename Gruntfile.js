module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        test: {
            files: ['test/**/*.js'],
            tasks: "simplemocha:dev"
        },
        lint: {
            files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        simplemocha: {
            dev: {
                src: ['test/**/*[Tt]ests.js'],
                options: {
                    reporter: 'spec',
                    slow: 200,
                    timeout: 1000
                }
            },
            explicit: {
                src: ['test/**/*.Explicit.js'],
                options: {
                    slow: 200,
                    timeout: 1000
                }
            }
        },
        jasmine_node: {
            specNameMatcher: ".Spec", // load only specs containing specNameMatcher
            projectRoot: ".",
            requirejs: false,
            forceExit: true
          }
    });

    // Add our custom tasks.
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['simplemocha:dev', 'jasmine_node']);
    grunt.registerTask('testExplicit', 'simplemocha:explicit');
    grunt.registerTask('default', ['test', 'jshint']);

};
