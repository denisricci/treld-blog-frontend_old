var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin  = require('gulp-cssmin');
var prefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var csslint = require('gulp-csslint');

gulp.task('default', ['copy'], function(){
	gulp.start('build-image', 'usemin');
});

gulp.task('build-image', function(){
    gulp.src('src/assets/images/**/*').pipe(imagemin()).pipe(gulp.dest('dist/assets/images'));
});

gulp.task('copy', ['clean'], function(){
    return gulp.src('src/**/*').pipe(gulp.dest('dist'))
});

gulp.task('clean', function(){
    return gulp.src('dist').pipe(clean());
});

gulp.task('usemin', function(){
	gulp.src('src/**/*.html').pipe(usemin({
		'js':[uglify],
		'css':[prefixer, cssmin]
	})).pipe(gulp.dest('dist'));
});

gulp.task('server', function(){
	browserSync.init({
		server:{
			baseDir:'src'
		}
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);

	gulp.watch('src/assets/js/**/*.js', function(event){
		gulp.src(event.path).pipe(jshint()).pipe(jshint.reporter(jshintStylish));
	});

	gulp.watch('src/assets/css/**/*.css',function(event){
		gulp.src(event.path).pipe(csslint()).pipe(csslint.reporter());
	});
});