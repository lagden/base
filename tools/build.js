/* eslint camelcase: 0 */
/* eslint no-unused-expressions: 0 */
({
	optimize: 'uglify2',
	uglify2: {
		warnings: true,
		compress: {
			sequences: true,
			properties: true,
			unused: true,
			drop_debugger: true,
			drop_console: true,
			hoist_funs: false,
			side_effects: false
		}
	},
	optimizeCss: 'none',
	generateSourceMaps: false,
	useSourceUrl: false,
	removeCombined: true,
	keepAmdefine: false,
	cjsTranslate: true,
	preserveLicenseComments: false,
	findNestedDependencies: true,
	useStrict: false,
	baseUrl: '../dev/js',
	mainConfigFile: '../dev/js/config.js',
	name: '../node_modules/almond/almond',
	include: ['app'],
	insertRequire: ['app'],
	out: '../public/js/app.min.js',
	wrap: true,
	wrapShim: true
});
