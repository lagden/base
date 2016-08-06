/* eslint-env amd */
/* eslint import/no-amd: 0 */

'use strict';

require(['config'], () => {
	// If the application runs in IE or Safari, add polyfill
	// See config.js
	// require(['babel-polyfill', './core/base']);
	require(['core/core']);
});
