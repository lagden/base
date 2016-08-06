'use strict';

import $ from 'jquery/ajax';
import 'jquery/ajax/xhr';
import cor from '../lib/color';

const docFrag = document.createDocumentFragment();
const p = document.createElement('p');
const h1 = document.querySelector('body > main > div > h1');

const txtNode = [
	document.createTextNode('Pura diversão ;)'),
	document.createElement('br'),
	document.createTextNode(`A cor é ${cor}`),
	document.createElement('br'),
	document.createTextNode(`A versão do jQuery é ${$.fn.jquery}`),
	document.createElement('br')
];

function doIt() {
	txtNode.forEach(tn => {
		p.appendChild(tn);
	});
	docFrag.appendChild(p);
	h1.parentNode.insertBefore(docFrag, h1.nextSibling);
}

txtNode.push(document.createElement('br'));
txtNode.push(document.createTextNode('<----> lagden/base/commits'));
txtNode.push(document.createElement('br'));

$.ajax({
	url: 'https://api.github.com/repos/lagden/base/commits',
	global: false
})
	.then(rs => {
		rs.forEach(r => {
			txtNode.push(document.createTextNode(r.commit.message));
			txtNode.push(document.createElement('br'));
		});
	})
	.then(() => {
		doIt();
	});
