'use strict'
var _, vimwikiReplace;

_ = require('underscore');

vimwikiReplace = function (md, options, Token) {
	var arrayReplaceAt, createTokens, defaults, pattern, splitTextToken;
	arrayReplaceAt = md.utils.arrayReplaceAt;
	//lastId = 0;
	defaults = {
		divWrap: false,
		divClass: 'vimwiki',
		idPrefix: 'vimwiki'
	};
	options = _.extend(defaults, options);
	pattern = /\[{2}(\w+)((\|)(\w+))?\]{2}/i;

createTokens = function (checked, label, linkText, Token) {
	var nodes, token;
	nodes = [];

	var fullUrl = 'fullUrl';
	var urlText = 'urlText';
	var urlText = label;
	if (typeof linkText !== 'undefined') {
		urlText = linkText;
	} else {
		urlText = label;
	}
	fullUrl = './' + label + '.html';

	token         = new Token('link_open', 'a', 1);
	token.attrs   = [ [ 'href', fullUrl ] ];
	//token.level   = level++;
	token.markup  = 'linkify';
	token.info    = 'auto';
	nodes.push(token);

	token         = new Token('text', '', 0);
	token.content = urlText;
	//token.level   = level;
	nodes.push(token);

	token         = new Token('link_close', 'a', -1);
	//token.level   = --level;
	token.markup  = 'linkify';
	token.info    = 'auto';
	nodes.push(token);

	return nodes;
	};
splitTextToken = function (original, Token) {
	var checked, label, matches, text, linkText, value;
	text = original.content;

	matches = text.match(pattern);
	debugger;
	if (matches === null) {
	return original;
	}
	checked = false;
	label = matches[1];
	linkText = matches[4];
	//label = matches[2];
	return createTokens(checked, label, linkText, Token);
};
	return function (state) {
		var blockTokens, i, j, l, token, tokens;
		blockTokens = state.tokens;
		debugger;
		j = 0;
		l = blockTokens.length;
		while (j < l) {
			if (blockTokens[j].type !== 'inline') {
				j++;
				continue;
			}
			tokens = blockTokens[j].children;
			i = tokens.length - 1;
			while (i >= 0) {
				token = tokens[i];
				blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token, state.Token));
				i--;
			}
			j++;
		}
	};
};


/*global module */

module.exports = function (md, options) {
	md.core.ruler.push('vimwiki', vimwikiReplace(md, options));
};
