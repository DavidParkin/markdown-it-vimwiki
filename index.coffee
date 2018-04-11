'use strict'
_ = undefined
vimwikiReplace = undefined
_ = require('underscore')

vimwikiReplace = (md, options, Token) ->
  arrayReplaceAt = undefined
  createTokens = undefined
  defaults = undefined
  pattern = undefined
  splitTextToken = undefined
  arrayReplaceAt = md.utils.arrayReplaceAt
  defaults = suffix: 'wiki'
  options = _.extend(defaults, options)
  pattern = /\[\[([A-Za-z1-9\- ]+)?\|?(\w+)?\]\](.*)/

  createTokens = (linkUrl, linkText, remainder, Token) ->
    nodes = undefined
    token = undefined
    fullUrl = undefined
    nodes = []
    urlText = linkUrl
    if typeof linkText != 'undefined'
      urlText = linkText
    else
      urlText = linkUrl
    fullUrl = './' + linkUrl + '.' + options.suffix
    token = new Token('link_open', 'a', 1)
    token.attrs = [ [
      'href'
      fullUrl
    ] ]
    #token.level   = level++;
    token.markup = 'linkify'
    token.info = 'auto'
    nodes.push token
    token = new Token('text', '', 0)
    token.content = urlText
    #token.level   = level;
    nodes.push token
    token = new Token('link_close', 'a', -1)
    #token.level   = --level;
    token.markup = 'linkify'
    token.info = 'auto'
    nodes.push token
    token = new Token('text', '', 0)
    token.content = remainder
    #token.level   = level;
    nodes.push token
    nodes

  splitTextToken = (original, Token) ->
    linkUrl = undefined
    matches = undefined
    text = undefined
    linkText = undefined
    remainder = undefined
    text = original.content
    matches = text.match(pattern)
    if matches == null
      return original
    linkUrl = matches[1]
    linkText = matches[2]
    remainder = matches[3]
    createTokens linkUrl, linkText, remainder, Token

  (state) ->
    blockTokens = undefined
    i = undefined
    j = undefined
    l = undefined
    token = undefined
    tokens = undefined
    blockTokens = state.tokens
    j = 0
    l = blockTokens.length
    while j < l
      if blockTokens[j].type != 'inline'
        j++
        continue
      tokens = blockTokens[j].children
      i = tokens.length - 1
      while i >= 0
        token = tokens[i]
        if token.type != 'code_inline'
          blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, splitTextToken(token, state.Token))
        i--
      j++
    return

###global module ###

module.exports = (md, options) ->
  md.core.ruler.push 'vimwiki', vimwikiReplace(md, options)
  return
