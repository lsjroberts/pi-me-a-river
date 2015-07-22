module.exports = function(grunt) {

  grunt.initConfig({
    elm: {
      compile: {
        files: {
          "build/main.js": ["src/Main.elm"]
        }
      }
    },
    watch: {
      elm: {
        files: ["src/Main.elm"],
        tasks: ["elm"]
      }
    },
    clean: ["elm-stuff/build-artifacts"]
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-elm');

  grunt.registerTask('default', ['elm']);

};
