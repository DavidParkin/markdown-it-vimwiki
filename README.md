# markdown-it-vimwiki [![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url]

> Plugin to create vimwiki links [[]] for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.




## Usage

## Install

node.js, browser:

```bash
npm install markdown-it-vimwiki --save
bower install markdown-it-vimwiki --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-vimwiki'));

md.render('[[link]]') // =>
// 
//  <a href="./link.wiki">link</a></p>>
//

md.render('[[link|text]]') // =>
// 
//  <a href="./link.wiki">text</a></p>>
// 
```


_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitVimwiki`.

## Options

```js
var md = require('markdown-it')()
            .use(require('markdown-it-vimwiki'),{
              suffix: 'wiki'
            });

```


## License

[MIT License](https://github.com/DavidParkin/markdown-it-vimwiki/blob/master/LICENSE) © 2015 David Parkin

[npm-url]: https://npmjs.org/package/markdown-it-vimwiki
[npm-image]: https://img.shields.io/npm/v/markdown-it-vimwiki.svg

[travis-url]: http://travis-ci.org/mcecot/markdown-it-vimwiki
[travis-image]: https://secure.travis-ci.org/mcecot/markdown-it-vimwiki.svg?branch=master

[coveralls-url]: https://coveralls.io/r/mcecot/markdown-it-vimwiki
[coveralls-image]: https://img.shields.io/coveralls/mcecot/markdown-it-vimwiki.svg

[depstat-url]: https://david-dm.org/mcecot/markdown-it-vimwiki
[depstat-image]: https://david-dm.org/mcecot/markdown-it-vimwiki.svg

[devdepstat-url]: https://david-dm.org/mcecot/markdown-it-vimwiki#info=devDependencies
[devdepstat-image]: https://david-dm.org/mcecot/markdown-it-vimwiki/dev-status.svg
