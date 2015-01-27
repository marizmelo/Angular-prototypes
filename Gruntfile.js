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
    },
    uglify: {
      my_target: {
        files: {
          'dist/scripts/scripts.min.js': ['app/**/*.js']
        }
      }
    },
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "app/views",
          src: "**/*.jade",
          dest: "dist/views",
          expand: true,
          ext: ".html"
        } ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['jshint', 'cssmin', 'jade', 'connect']);
};
