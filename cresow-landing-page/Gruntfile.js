// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks

    serve: {
        options: {
            port: 9000
        }
    },
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'resources/sass',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['resources/js/*.js'],
        dest: 'js/script.min.js'
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'resources/sass/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'resources/js/*.js',
        tasks: ['uglify']
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');


  // Register Grunt tasks
  grunt.registerTask('default', ['sass','uglify','watch','serve']);
};
