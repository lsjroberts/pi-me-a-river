module.exports = function(grunt) {

  grunt.initConfig({
    elm: {
      main: {
        files: {
          "public/assets/main.js": ["src/Main.elm"]
        }
      }
    },
    sass: {
      main: {
        options: {
          style: "expanded"
        },
        files: {
          "public/assets/main.css": "src/assets/styles/main.scss"
        }
      }
    },
    copy: {
      main: {
        src: 'src/index.html',
        dest: 'public/index.html'
      }
    },
    watch: {
      elm: {
        files: ["src/**/*.elm"],
        tasks: ["elm"]
      },
      scss: {
        files: ["src/assets/styles/**/*.scss"],
        tasks: ["sass"]
      },
      html: {
        files: ["src/*.html"],
        tasks: ["copy"]
      }
    },
    clean: ["elm-stuff/build-artifacts"]
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-elm');

  grunt.registerTask('build', ['elm:main', 'sass:main', 'copy:main']);

  grunt.registerTask('default', ['build']);

};
