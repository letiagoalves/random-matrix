module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: 'conf/eslint.json',
            },
            target: ['src/**/*.js', 'test/**/*.js']
        },

        mochacli: {
            unit: ['test/**/*.js']
        }
    });

    grunt.registerTask('test', ['eslint', 'mochacli:unit']);
};
