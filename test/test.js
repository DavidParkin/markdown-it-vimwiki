'use strict';

var assert = require('assert');
var md = require('markdown-it')().use(require('../index.js'));

/*eslint-env mocha*/
/* eslint-disable indent */

describe('markdown-it-wikilinks', function () {
	it('renders simple [[link]]', function() {
					assert.equal(md.render('[[link]]'), '<p><a href="./link.wiki">link</a></p>\n');
	});
	it('renders [[link|text]]', function() {
					assert.equal(md.render('[[link|text]]'), '<p><a href="./link.wiki">text</a></p>\n');
	});
	it('renders simple [[link]] and more text', function() {
					assert.equal(md.render('[[link]] and more text'), '<p><a href="./link.wiki">link</a> and more text</p>\n');
	});
});
