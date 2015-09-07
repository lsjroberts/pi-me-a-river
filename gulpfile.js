// Dependencies
var gulp = require('gulp')
  , nodemon = require('nodemon')
  ;

// Tasks
gulp.task('serve', function (next) {
  nodemon({
    script: './server.js',
    watch: ['./server.js', './api']
  });
});
