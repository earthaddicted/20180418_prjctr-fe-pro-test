var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');

var concat = require('gulp-concat');
var del = require('del');

var browserSync = require('browser-sync');
var server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}

var pugFiles = [
	'src/**/*.pug',
	'!src/layouts/**',
	'!src/blocks/**',
    '!src/globals/**/*.pug',
    '!src/vendor/**/*.pug'
];
var stylFiles = [
	'src/assets/**/*.styl',
];
var cssVendor = [
    'src/vendor/**/*.css'
];

var jsFiles = [
	'!src/vendor/**/*.js',
	'src/assets/**/*.js',
	'src/blocks/**/*.js'	
];
var jsVendor = [
    'src/vendor/**/*.js'
];
var imgFiles = [
	'src/assets/**/*.{jpg,png,jpeg,svg,gif}',
];

gulp.task('pug', function() {
	return gulp.src(pugFiles)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
});

gulp.task('stylus', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
	return gulp.src(stylFiles)
		.pipe(stylus())
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/app.css'))
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});

gulp.task('cssVendor', function() {
    var postCSSplugins = [
        autoprefixer({browsers: ['last 10 version']})
    ];
	return gulp.src(cssVendor)
		.pipe(postcss(postCSSplugins))
    	.pipe(concat('assets/vendor.css'))
		.pipe(gulp.dest('build/'))
		.pipe(server.stream())
});

gulp.task('js', function () {
  return gulp.src(jsFiles)
    .pipe(concat('assets/app.js'))
    .pipe(gulp.dest('build'))
});

gulp.task('jsVendor', function () {
  return gulp.src(jsVendor)
    .pipe(concat('assets/vendor.js'))
    .pipe(gulp.dest('build'))
});

gulp.task('img', function () {
  return gulp.src(imgFiles)
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets'))
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.styl', gulp.series('stylus', 'cssVendor'));
	gulp.watch('src/**/*.pug', gulp.series('pug', reload));
	gulp.watch('src/**/*.js', gulp.series('js', 'jsVendor', reload));
	gulp.watch(imgFiles, gulp.series('img', reload));
});

gulp.task('clean', function(){
	return del('./build');	
});

gulp.task('build', gulp.parallel('stylus', 'cssVendor', 'pug', 'js', 'jsVendor', 'img'));

gulp.task('serve', gulp.parallel('watch', serve));

gulp.task('default', gulp.series('clean','build', 'serve'));