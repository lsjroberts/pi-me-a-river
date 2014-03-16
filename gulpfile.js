var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');

var rimraf = require('gulp-rimraf');

gulp.task('styles-clean', function() {
    return gulp.src('build/styles/**/*.css')
        .pipe(rimraf());
});

gulp.task('styles', ['styles-clean'], function() {
    return gulp.src(['assets/styles/**/*.sass', 'assets/styles/**/*.css'])
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('combined.css'))
        .pipe(minifycss({ removeEmpty: true }))
        .pipe(gulp.dest('build/styles'))
        .pipe(notify({ message: 'styles built' }));
});

gulp.task('scripts-clean', function() {
    return gulp.src('build/scripts/**/*.js')
        .pipe(rimraf());
});

gulp.task('scripts', ['scripts-clean'], function() {
    return gulp.src(['assets/scripts/vendor/**/*.js', 'assets/scripts/**/*.js'])
        .pipe(concat('combined.js'))
        .pipe(gulp.dest('build/scripts'))
        .pipe(notify({ message: 'scripts built' }));
});

// gulp.task('app', function() {
//     return gulp.src(['app/**/*.coffee'])
//         .pipe(concat('combined.coffee'))
//         .pipe(coffee())
//         .pipe(gulp.dest('build/scripts'))
//         .pipe(notify({message: 'app built'}));
// });

gulp.task('default', ['scripts', 'styles']);