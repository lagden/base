'use strict';

const join = require('path').join;
const gulp = require('gulp');
const pug = require('gulp-pug');
const watch = require('./helpers/watch');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const pugPath = join(__dirname, '..', 'src', 'pug');
const outPath = join(__dirname, '..', isDev ? 'dev' : 'public');

function template() {
	return gulp
		.src(join(pugPath, '*.pug'))
		.pipe(pug({
			pretty: isDev,
			locals: {
				isDev
			}
		}))
		.pipe(gulp.dest(outPath));
}

function watchTemplate() {
	return watch(join(pugPath, '**/*.pug'), template);
}

exports.task = template;
exports.watch = watchTemplate;
