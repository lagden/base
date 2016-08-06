'use strict';

const join = require('path').join;
const ch = require('child_process');
const pify = require('pify');
const watch = require('./helpers/watch');

const exec = pify(ch.exec);
const jsPath = join(__dirname, '..', 'src', 'js');
const cmd = 'npm run rollup';

function js() {
	return exec(cmd);
}

function watchJs() {
	return watch(join(jsPath, '**/*.js'), js);
}

exports.task = js;
exports.watch = watchJs;
