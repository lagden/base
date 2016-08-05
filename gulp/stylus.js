'use strict';

const join = require('path').join;
const ch = require('child_process');
const pify = require('pify');
const watch = require('./helpers/watch');

const exec = pify(ch.exec);
const isDev = (process.env.NODE_ENV || 'development') === 'development';
const stylusPath = join(__dirname, '..', 'src', 'stylus');
const cmd = `env NODE_ENV=${isDev ? 'development' : 'prod'} npm run postcss`;

function css() {
	return exec(cmd);
}

function watchCss() {
	return watch(join(stylusPath, '**/*.styl'), css);
}

exports.task = css;
exports.watch = watchCss;
