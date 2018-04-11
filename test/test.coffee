'use strict'
path = require('path')
generate = require('markdown-it-testgen')
should = require 'should'

###eslint-env mocha ###
describe 'markdown-it-vimwiki', ->

  describe 'markdown-it-vimwiki()', ->
    plugin = require '../'
    md = require('markdown-it')()
    md.use plugin, {divWrap: false}
    generate path.join(__dirname, 'fixtures/vimwiki.txt'), md

    it 'should pass irrelevant markdown', (done) ->
      res = md.render('# test')
      res.toString().should.be.eql '<h1>test</h1>\n'
      done()

  describe 'markdown-it-vimwiki(options)', ->
    plugin = require('../')

    it 'should should optionally produce html output', (done) ->
      md = require('markdown-it')()
      md.use plugin, {suffix: 'html'}
      res = md.render('[[link]] test written')
      res.toString().should.be.eql '<p><a href="./link.html">link</a> test written</p>\n'
      done()

