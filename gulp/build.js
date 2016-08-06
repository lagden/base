'use strict';

const ch = require('child_process');
const pify = require('pify');

const exec = pify(ch.exec);
const cmd = 'npm run optimize';

function rjs() {
	return exec(cmd);
}

exports.task = rjs;
