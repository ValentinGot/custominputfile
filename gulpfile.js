'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

// Compute JS
gulp.task('javascripts', function() {
    gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

// Compute CSS
gulp.task('styles', function() {
    return sass('sass/*.scss', { style: 'expanded' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['javascripts']);
    gulp.watch('./sass/*.scss', ['styles']);
});

// Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js']);
});

// Main
gulp.task('default', ['clean'], function() {
    gulp.start('javascripts', 'styles', 'watch');
});