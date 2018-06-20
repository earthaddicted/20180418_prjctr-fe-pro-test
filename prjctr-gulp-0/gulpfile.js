var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var server = browserSync.create();
// var concat = require('gulp-concat');
// import browserSync from 'browser-sync';
// const server = browserSync.create();

var moduleBgFix = require('./moduleBgFix/');
var postcssPrefixer = require('./postcssPrefixer/');

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'build/'
    }
  });
  done();
}

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
		.pipe(server.stream())
});

// gulp.task('scripts', function() {
//   return gulp.src('./lib/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./dist/'));
// });


gulp.task('watch', function() {
	gulp.watch('src/**/*.styl', gulp.series('stylus'));
	gulp.watch('src/**/*.pug', gulp.series('pug', reload));
});

gulp.task('build', gulp.parallel('stylus', 'pug'));

gulp.task('serve', gulp.parallel('watch', serve));

gulp.task('default', gulp.series('build', 'serve'));


