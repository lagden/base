'use strict';

const gulp = require('gulp');

const symlink = require('./gulp/symlink');
const pug = require('./gulp/pug');
const stylus = require('./gulp/stylus');
const rollup = require('./gulp/rollup');
const cp = require('./gulp/cp');
const build = require('./gulp/build');

gulp.task('default', gulp.parallel(
	symlink.node,
	cp.favicon,
	stylus.task,
	pug.task,
	rollup.task
));

gulp.task('watch', gulp.parallel(
	'default',
	stylus.watch,
	pug.watch,
	rollup.watch
));

// You must use NODE_ENV=production
gulp.task('build', gulp.series(
	'default',
	build.task
));
