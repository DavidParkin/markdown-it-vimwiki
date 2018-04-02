'use strict';
var _, vimwikiReplace;

_ = require('underscore');

vimwikiReplace = function (md, options, Token) {
	var arrayReplaceAt, createTokens, defaults, pattern, splitTextToken;
	arrayReplaceAt = md.utils.arrayReplaceAt;
	defaults = {
		suffix: 'wiki'
	};
	options = _.extend(defaults, options);
	pattern = /\[\[([A-Za-z1-9\- ]+)?\|?(\w+)?\]\](.*)/; 

	createTokens = function (linkUrl, linkText, remainder, Token) {
		var nodes, token, fullUrl;
		nodes = [];

		var urlText = linkUrl;
		if (typeof linkText !== 'undefined') {
			urlText = linkText;
		} else {
			urlText = linkUrl;
		}
		fullUrl = './' + linkUrl + '.' + options.suffix;

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

		token         = new Token('text', '', 0);
		token.content = remainder;
		//token.level   = level;
		nodes.push(token);

		return nodes;
	};
	splitTextToken = function (original, Token) {
		var linkUrl, matches, text, linkText, remainder;
		text = original.content;

		matches = text.match(pattern);
		debugger;
		if (matches === null) {
			return original;
		}
		linkUrl = matches[1];
		linkText = matches[2];
		remainder = matches[3];
		return createTokens(linkUrl, linkText, remainder, Token);
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
				if (token.type != "code_inline") {
					blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token, state.Token));
				}
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
