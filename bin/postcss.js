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
const cssnano = require('cssnano');

const log = debug('app:log');
const error = debug('app:error');

const isDev = (process.env.NODE_ENV || 'development') === 'development';
const stylusPath = join(__dirname, '..', 'src', 'stylus');
const outPath = join(__dirname, '..', isDev ? 'dev' : 'public', 'css');
const file = join(stylusPath, 'app.styl');
const out = 'app.css';

const postcssPlugins = [
	autoprefixer,
	b64
];

const postcssSourceMap = {};

if (isDev === false) {
	postcssPlugins.push(cssnano);
} else {
	Object.assign(postcssSourceMap, {
		from: out,
		map: {
			inline: false,
			annotation: `maps/${out}.map`,
			sourcesContent: false
		}
	});
}

pify(mkdirp)(join(outPath), 0o755)
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
		return postcss(postcssPlugins).process(css, postcssSourceMap);
	})
	.then(result => {
		log('Postcss processed');
		const wsCss = fs.createWriteStream(join(outPath, out));
		wsCss.end(result.css);
		if (result.map && isDev) {
			pify(mkdirp)(join(outPath, 'maps'), 0o755)
				.then(() => {
					const wsMap = fs.createWriteStream(join(outPath, 'maps', `${out}.map`));
					wsMap.end(result.map.toString());
				});
		}
	})
	.catch(err => {
		error(err);
	});
