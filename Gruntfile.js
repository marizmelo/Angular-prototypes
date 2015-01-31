module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        ignores : ['app/scripts/bower.js']
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
    },
    wiredep: {
      target: {
        src: 'app/index.html',
        ignorePath: '../',
        dependencies: true,
        devDependencies: false
      }
    },
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'app/styles/*.css',
        dest: 'app/styles/'
      }
    },
    coffee: {
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'app/scripts/coffee.js': 'app/scripts/*.coffee'
        }
      }
    },
    copy: {
      main: {
        files: [
      {cwd: 'app', src: 'index.html', dest: 'dist', expand: true}
        ]
      }
    },
    bower_concat: {
      all: {
        dest: 'app/scripts/bower.js',
        cssDest: 'app/styles/bower.css'
      }
    }
  });
  //REMOVED
  //clean: ["app/scripts/*.*", "app/styles/*.*"]
  
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('alldone', function() {
    grunt.log.writeln('Your dist/ folder is ready for production.');
  });

  grunt.registerTask('build', ['jshint', 'jade', 'coffee', 'autoprefixer', 'cssmin', 'bower_concat', 'uglify', 'alldone']);
  //grunt.registerTask('dev', ['jshint', 'jade', 'coffee', 'autoprefixer', 'cssmin', 'wiredep', 'bower_concat', 'uglify', 'connect']);
  grunt.registerTask('default', ['connect']);
};
