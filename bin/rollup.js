#!/usr/bin/env node

'use strict';

const join = require('path').join;
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const debug = require('debug');

const log = debug('app:log');
const error = debug('app:error');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const jsPath = join(__dirname, '..', 'src', 'js');
const outPath = join(__dirname, '..', 'dev', 'js');

const plugins = [
	babel({
		babelrc: false
	})
];

function baseRollup(entry, dest, moduleId) {
	moduleId = moduleId || null;
	return rollup
		.rollup({
			entry,
			plugins
		})
		.then(bundle => {
			return bundle.write({
				format: 'amd',
				sourceMap: isDev,
				useStrict: true,
				indent: true,
				moduleId,
				dest
			});
		});
}

log('Building...');

function run() {
	return Promise.all([
		baseRollup(join(jsPath, 'config.js'), join(outPath, 'config.js'), 'config'),
		baseRollup(join(jsPath, 'app.js'), join(outPath, 'app.js')),
		baseRollup(join(jsPath, 'core', 'core.js'), join(outPath, 'core', 'core.js'))
	]);
}

run()
	.then(() => {
		log('scripts created...');
	})
	.catch(error);
