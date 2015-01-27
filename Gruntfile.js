module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'dist/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'app/**/*.scss'],
      tasks: ['jshint'],
      options: {
        livereload: true
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.min.css'
        }]
      }
    },
    connect: {  // open server
      server: {
        options: {
          port: 9001,
          base: 'dist',
          appName: 'Chrome',
          keepalive: true,
          open: true,
          useAvailablePort: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'cssmin', 'connect']);
};
