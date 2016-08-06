'use strict';

const join = require('path').join;
const gulp = require('gulp');

const nodePath = join(__dirname, '..', 'node_modules');
const outPath = join(__dirname, '..', 'dev');

function symlink(target, dest) {
	return gulp
		.src(target)
		.pipe(gulp.symlink(dest, {
			overwrite: true
		}));
}

function nodeModules() {
	return symlink(nodePath, outPath);
}

exports.task = symlink;
exports.node = nodeModules;
