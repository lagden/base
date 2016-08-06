'use strict';

const join = require('path').join;
const gulp = require('gulp');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const srcPath = join(__dirname, '..', 'src');
const devPath = join(__dirname, '..', 'dev');
const publicPath = join(__dirname, '..', 'public');

function copy(target, dest) {
	return gulp
		.src(target)
		.pipe(gulp.dest(dest));
}

function favicon() {
	const outPath = isDev ? devPath : publicPath;
	return copy(join(srcPath, 'ico', 'favicon.ico'), outPath);
}

exports.task = copy;
exports.favicon = favicon;
