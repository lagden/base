'use strict';

const gulp = require('gulp');

const pug = require('./gulp/pug');
const stylus = require('./gulp/stylus');

gulp.task('default', gulp.parallel(
	stylus.task,
	pug.task
));

gulp.task('watch', gulp.parallel(
	'default',
	stylus.watch,
	pug.watch
));
