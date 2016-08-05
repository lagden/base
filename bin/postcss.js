#!/usr/bin/env node

'use strict';

const fs = require('fs');
const join = require('path').join;
const stylus = require('stylus');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const pify = require('pify');
const mkdirp = require('mkdirp');
const debug = require('debug');
const b64 = require('postcss-inline-base64');
const nib = require('nib');
const rupture = require('rupture');

const log = debug('app:log');
const error = debug('app:error');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const stylusPath = join(__dirname, '..', 'src', 'stylus');
const outPath = join(__dirname, '..', isDev ? 'dev' : 'public', 'css');
const file = join(stylusPath, 'app.styl');
const out = 'app.css';

pify(mkdirp)(join(outPath, 'maps'), 0o755)
	.then(() => pify(fs.readFile)(file, 'utf8'))
	.then(str => new Promise((resolve, reject) => {
		log(`Read the file: ${file}`);
		stylus(str)
			.set('filename', file)
			.use(nib())
			.use(rupture())
			.render((err, css) => {
				if (err) {
					reject(err);
				}
				log('Stylus rendered');
				resolve(css);
			});
	}))
	.then(css => {
		return postcss([
			autoprefixer,
			b64
		]).process(css, {
			from: out,
			map: {
				inline: false,
				annotation: `maps/${out}.map`,
				sourcesContent: false
			}});
	})
	.then(result => {
		log('Postcss processed');
		const wsCss = fs.createWriteStream(join(outPath, out));
		wsCss.end(result.css);
		if (result.map) {
			const wsMap = fs.createWriteStream(join(outPath, 'maps', `${out}.map`));
			wsMap.end(result.map.toString());
		}
	})
	.catch(err => {
		error(err);
	});
