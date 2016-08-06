/* eslint camelcase: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint quote-props: 0 */

'use strict';

requirejs.config({
	baseUrl: 'js',
	paths: {
		jquery: '../node_modules/jquery/src'
		// If the application runs in IE or Safari, add polyfill
		// See app.js
		// 'babel-polyfill': '../node_modules/babel-polyfill/dist/polyfill'
	},
	map: {
		'jquery/selector': {
			'jquery/selector-sizzle': 'jquery/selector-native'
		}
	}
});
