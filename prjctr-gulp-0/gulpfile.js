var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var moduleBgFix = require('./moduleBgFix/');
var postcssPrefixer = require('./postcssPrefixer/');

gulp.task('pug', function() {
	return gulp.src('src/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
});

gulp.task('stylus', function() {

    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']}),
        moduleBgFix(),
        postcssPrefixer()
    ];

	return gulp.src('src/*.styl')
		.pipe(stylus())
		.pipe(postcss(postCSSplugins))
		.pipe(gulp.dest('build/'))
});


gulp.task('default', function() {
  // place code for your default task here
});